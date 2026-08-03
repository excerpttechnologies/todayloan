const CompanyCategory = require('../models/CompanyCategory');
const Bank = require('../models/Bank');
const { parseCompanyCategoryExcel, buildCompanyCategoryTemplateBuffer } = require('../utils/companyCategoryExcel');

// ─── LIST (per bank) ───────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 50);
    const { search } = req.query;

    let bankId = req.query.bankId;
    if (req.user.role === 'bank') {
      const ownBank = await Bank.findOne({ userId: req.user._id });
      if (!ownBank) return res.status(403).json({ message: 'No bank profile linked to this account' });
      bankId = ownBank._id;
    }
    if (!bankId) return res.status(400).json({ message: 'bankId is required' });

    const query = { bankId };
    if (search) query.companyNameKey = { $regex: search.trim().toLowerCase(), $options: 'i' };

    const [rows, total] = await Promise.all([
      CompanyCategory.find(query).sort({ companyName: 1 }).skip((page - 1) * limit).limit(limit),
      CompanyCategory.countDocuments(query),
    ]);

    res.json({ rows, total, page, limit, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DOWNLOAD TEMPLATE ─────────────────────────────────────────────────────────
exports.downloadTemplate = async (req, res) => {
  try {
    const buffer = buildCompanyCategoryTemplateBuffer();
    res.setHeader('Content-Disposition', 'attachment; filename="company-category-template.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── IMPORT FROM EXCEL (bulk upsert) ───────────────────────────────────────────
// mode=replace wipes this bank's existing list first; default just upserts
// row by row (so partial re-uploads/updates don't wipe everything else).
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

    const rows = parseCompanyCategoryExcel(req.file.buffer);
    if (!rows.length) return res.status(400).json({ message: 'No valid rows found in the sheet (expected columns: Company Name, Category)' });

    if (req.query.mode === 'replace') {
      await CompanyCategory.deleteMany({ bankId });
    }

    let upserted = 0;
    for (const row of rows) {
      await CompanyCategory.findOneAndUpdate(
        { bankId, companyNameKey: row.companyName.trim().toLowerCase() },
        { bankId, bankName: bank.bankName, companyName: row.companyName, category: row.category, uploadedBy: req.user._id },
        { upsert: true, setDefaultsOnInsert: true }
      );
      upserted++;
    }

    res.status(201).json({ message: `Imported ${upserted} companies for ${bank.bankName}`, count: upserted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── DELETE ONE MAPPING ────────────────────────────────────────────────────────
exports.deleteOne = async (req, res) => {
  try {
    const row = await CompanyCategory.findById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Not found' });

    if (req.user.role === 'bank') {
      const ownBank = await Bank.findOne({ userId: req.user._id });
      if (!ownBank || row.bankId.toString() !== ownBank._id.toString()) {
        return res.status(403).json({ message: 'You can only manage your own bank\'s list' });
      }
    }

    await row.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── LOOKUP (used internally by applicationController) ────────────────────────
// Not a route — plain helper, exported so applicationController can call it
// directly without an HTTP round-trip.
exports.lookupCategory = async function lookupCategory(bankId, companyName) {
  if (!bankId || !companyName) return null;
  const key = String(companyName).trim().toLowerCase();
  if (!key) return null;
  const row = await CompanyCategory.findOne({ bankId, companyNameKey: key });
  return row ? { category: row.category, companyName: row.companyName } : null;
};
