const BankPolicy = require('../models/BankPolicy');
const Bank = require('../models/Bank');
const { AuditLog } = require('../models/index');
const { parsePolicyExcel, buildPolicyTemplateBuffer } = require('../utils/policyExcelTemplate');

// ─── MY BANK (for bank-role users) ────────────────────────────────────────────
// Lets the Bank Policy page auto-lock the "Bank" field to the logged-in
// bank's own record, instead of showing every bank in the system.
exports.getMyBank = async (req, res) => {
  try {
    const bank = await Bank.findOne({ userId: req.user._id });
    if (!bank) return res.status(404).json({ message: 'No bank profile linked to this account' });
    res.json(bank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET LIST ─────────────────────────────────────────────────────────────────
exports.getPolicies = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const { search, status, bankId, loanType } = req.query;

    const query = {};
    if (search) query.$or = [
      { bankName: { $regex: search, $options: 'i' } },
      { policyVersion: { $regex: search, $options: 'i' } },
    ];
    if (status) query.status = status;
    if (bankId) query.bankId = bankId;
    if (loanType) query.loanType = loanType;

    // If the logged-in user is a bank, restrict to their own policies
    if (req.user.role === 'bank') {
      const bank = await Bank.findOne({ userId: req.user._id });
      if (bank) query.bankId = bank._id;
    }

    const [policies, total] = await Promise.all([
      BankPolicy.find(query).populate('bankId', 'bankName').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      BankPolicy.countDocuments(query),
    ]);

    res.json({ policies, total, pages: Math.ceil(total / limit), page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GET BY ID ────────────────────────────────────────────────────────────────
exports.getPolicyById = async (req, res) => {
  try {
    const policy = await BankPolicy.findById(req.params.id).populate('bankId', 'bankName');
    if (!policy) return res.status(404).json({ message: 'Bank Policy not found' });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── CREATE ───────────────────────────────────────────────────────────────────
exports.createPolicy = async (req, res) => {
  try {
    let { bankId } = req.body;

    // Security: a 'bank' user can never create a policy for a different bank,
    // even if a different bankId is sent in the request body.
    if (req.user.role === 'bank') {
      const ownBank = await Bank.findOne({ userId: req.user._id });
      if (!ownBank) return res.status(403).json({ message: 'No bank profile linked to this account' });
      bankId = ownBank._id;
    }

    if (!bankId) return res.status(400).json({ message: 'bankId is required' });

    const bank = await Bank.findById(bankId);
    if (!bank) return res.status(404).json({ message: 'Bank not found' });

    const policy = await BankPolicy.create({
      ...req.body,
      bankId,
      bankName: bank.bankName,
      createdBy: req.user._id,
    });

    await AuditLog.create({
      userId: req.user._id, role: req.user.role, action: 'CREATE_BANK_POLICY',
      targetId: policy._id, targetType: 'BankPolicy',
      description: `Created bank policy for ${bank.bankName} (${policy.loanType})`,
    });

    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────
exports.updatePolicy = async (req, res) => {
  try {
    const existing = await BankPolicy.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Bank Policy not found' });

    const update = { ...req.body };
    if (req.user.role === 'bank') {
      const ownBank = await Bank.findOne({ userId: req.user._id });
      if (!ownBank || existing.bankId.toString() !== ownBank._id.toString()) {
        return res.status(403).json({ message: 'You can only edit your own bank\'s policy' });
      }
      update.bankId = ownBank._id; // ignore any bankId tampering from the client
    }
    if (update.bankId) {
      const bank = await Bank.findById(update.bankId);
      if (bank) update.bankName = bank.bankName;
    }
    const policy = await BankPolicy.findByIdAndUpdate(req.params.id, update, { new: true });

    await AuditLog.create({
      userId: req.user._id, role: req.user.role, action: 'UPDATE_BANK_POLICY',
      targetId: policy._id, targetType: 'BankPolicy',
      description: `Updated bank policy ${policy._id}`,
    });

    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── ACTIVATE / DEACTIVATE ────────────────────────────────────────────────────
exports.togglePolicyStatus = async (req, res) => {
  try {
    const policy = await BankPolicy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: 'Bank Policy not found' });

    if (req.user.role === 'bank') {
      const ownBank = await Bank.findOne({ userId: req.user._id });
      if (!ownBank || policy.bankId.toString() !== ownBank._id.toString()) {
        return res.status(403).json({ message: 'You can only manage your own bank\'s policy' });
      }
    }

    policy.status = policy.status === 'active' ? 'inactive' : 'active';
    await policy.save();

    await AuditLog.create({
      userId: req.user._id, role: req.user.role, action: 'TOGGLE_BANK_POLICY_STATUS',
      targetId: policy._id, targetType: 'BankPolicy',
      description: `Set bank policy ${policy._id} to ${policy.status}`,
    });

    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DOWNLOAD EXCEL TEMPLATE ───────────────────────────────────────────────────
// A ready-to-fill sheet so bank staff know the exact field names — no JSON
// or code knowledge needed.
exports.downloadTemplate = async (req, res) => {
  try {
    const buffer = buildPolicyTemplateBuffer();
    res.setHeader('Content-Disposition', 'attachment; filename="bank-policy-template.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── IMPORT FROM EXCEL ─────────────────────────────────────────────────────────
// Bank/Admin fills the template above and uploads it here. The sheet is
// parsed into a policy object and saved as a new BankPolicy (or merged into
// an existing one if `policyId` is passed to update it instead).
exports.importFromExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    let bankId = req.body.bankId;
    if (req.user.role === 'bank') {
      const ownBank = await Bank.findOne({ userId: req.user._id });
      if (!ownBank) return res.status(403).json({ message: 'No bank profile linked to this account' });
      bankId = ownBank._id;
    }
    if (!bankId) return res.status(400).json({ message: 'bankId is required' });

    const bank = await Bank.findById(bankId);
    if (!bank) return res.status(404).json({ message: 'Bank not found' });

    const parsed = parsePolicyExcel(req.file.buffer);
    const payload = { ...parsed, bankId, bankName: bank.bankName, createdBy: req.user._id };

    let policy;
    if (req.body.policyId) {
      policy = await BankPolicy.findByIdAndUpdate(req.body.policyId, payload, { new: true });
      if (!policy) return res.status(404).json({ message: 'Bank Policy not found' });
    } else {
      if (!payload.loanType) return res.status(400).json({ message: 'Loan Type is required in the sheet' });
      policy = await BankPolicy.create(payload);
    }

    await AuditLog.create({
      userId: req.user._id, role: req.user.role, action: 'IMPORT_BANK_POLICY_EXCEL',
      targetId: policy._id, targetType: 'BankPolicy',
      description: `Imported bank policy for ${bank.bankName} from Excel`,
    });

    res.status(201).json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
