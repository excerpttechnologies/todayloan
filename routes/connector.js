const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, requireRole } = require('../middleware/auth');
const LeadV2 = require('../models/LeadV2');
const Bank = require('../models/Bank');
const BankUser = require('../models/BankUser');
const UnlockApproval = require('../models/UnlockApproval');
const ConnectorBankAssignment = require('../models/ConnectorBankAssignment');
const Commission = require('../models/Commission');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { notifyLeadSubmitted, notifyUnlockApproved } = require('../utils/notifications');

const storage = multer.diskStorage({
  destination: (req, file, cb) => { const dir = path.join(__dirname, '../uploads/leads'); if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); cb(null, dir); },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });
const docFields = ['panCard','aadhaarCard','payslip1','payslip2','payslip3','bankStatement1','bankStatement2','bankStatement3','photo','form16','form26as','pfStatement'].map(f => ({ name: f, maxCount: 1 }));

router.use(protect, requireRole('connector'));

router.post('/leads/create', upload.fields(docFields), async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || {};
    const documents = {};
    Object.keys(files).forEach(field => { documents[field] = `/uploads/leads/${files[field][0].filename}`; });

    let existingLoans=[], selectedBanks=[], itrDetails=[], recentBanks=[];
    try { existingLoans = JSON.parse(body.existingLoans || '[]'); } catch {}
    try { selectedBanks = JSON.parse(body.selectedBanks || '[]'); } catch {}
    try { itrDetails    = JSON.parse(body.itrDetails    || '[]'); } catch {}
    try { recentBanks   = JSON.parse(body.recentBanks   || '[]'); } catch {}

    const bankUserDocs = await BankUser.find({ bankId: { $in: selectedBanks } });
    const assignedBankers = bankUserDocs.map(bu => bu.bankerId);
    const admin = await User.findOne({ role: 'admin' });

    const lead = await LeadV2.create({
      ...body, connectorId: req.user._id, existingLoans, itrDetails, recentBanks, selectedBanks, assignedBankers, documents,
      appliedRecently: body.appliedRecently === 'true', isBalanceTransfer: body.isBalanceTransfer === 'true',
      hasGST: body.hasGST === 'true', hasLabourLicense: body.hasLabourLicense === 'true',
      hasMSME: body.hasMSME === 'true', hasUDYAM: body.hasUDYAM === 'true',
      itrFiled: body.itrFiled === 'true', hasRelievingLetter: body.hasRelievingLetter === 'true',
      netSalary: Number(body.netSalary) || 0, cibilScore: Number(body.cibilScore) || 0,
    });

    for (const bankId of selectedBanks) {
      await ConnectorBankAssignment.create({ connectorId: req.user._id, bankId, leadId: lead._id, status: 'submitted' });
    }
    if (admin) await notifyLeadSubmitted({ adminId: admin._id, bankerIds: assignedBankers, leadId: lead._id, loanType: body.loanType });

    res.status(201).json({ success: true, lead });
  } catch (err) { console.error(err); res.status(500).json({ success: false, message: err.message }); }
});

router.get('/leads', async (req, res) => {
  try {
    const { status, loanType, page=1, limit=20 } = req.query;
    const filter = { connectorId: req.user._id };
    if (status) filter.overallStatus = status;
    if (loanType) filter.loanType = loanType;
    const leads = await LeadV2.find(filter).populate('selectedBanks','bankName').sort('-createdAt').skip((page-1)*limit).limit(Number(limit));
    const total = await LeadV2.countDocuments(filter);
    res.json({ success: true, leads, total, page: Number(page), pages: Math.ceil(total/limit) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/leads/:id', async (req, res) => {
  try {
    const lead = await LeadV2.findOne({ _id: req.params.id, connectorId: req.user._id }).populate('selectedBanks','bankName loanTypesSupported').populate('assignedBankers','name email');
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.json({ success: true, lead });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/approve-unlock', async (req, res) => {
  try {
    const { bankerId } = req.body;
    if (!bankerId) return res.status(400).json({ success: false, message: 'bankerId required' });
    const lead = await LeadV2.findOne({ _id: req.params.id, connectorId: req.user._id });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await UnlockApproval.findOneAndUpdate({ leadId: req.params.id, bankerId, connectorId: req.user._id }, { approved: true, approvedAt: new Date() }, { upsert: true, new: true });
    const connector = await User.findById(req.user._id);
    await notifyUnlockApproved({ bankerId, leadId: req.params.id, connectorName: connector.name });
    res.json({ success: true, message: 'Unlock approved. Banker can view full data.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/leads-responses', async (req, res) => {
  try {
    const BankerLeadAction = require('../models/BankerLeadAction');
    const myLeads = await LeadV2.find({ connectorId: req.user._id }).select('_id');
    const myLeadIds = myLeads.map(l => l._id);
    const actions = await BankerLeadAction.find({ leadId: { $in: myLeadIds } }).populate('bankerId','name email').populate('leadId','customerName loanType overallStatus').sort('-actionedAt');
    res.json({ success: true, actions });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/commissions', async (req, res) => {
  try {
    const commissions = await Commission.find({ connectorId: req.user._id }).populate('leadId','customerName loanType').sort('-createdAt');
    const totalEarned  = commissions.filter(c=>c.status==='paid').reduce((s,c)=>s+c.commissionAmount,0);
    const totalPending = commissions.filter(c=>c.status==='pending').reduce((s,c)=>s+c.commissionAmount,0);
    const now = new Date();
    const paidThisMonth = commissions.filter(c=>{ const d=new Date(c.paidDate); return c.status==='paid'&&d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); }).reduce((s,c)=>s+c.commissionAmount,0);
    res.json({ success: true, commissions, summary: { totalEarned, totalPending, paidThisMonth } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort('-createdAt').limit(50);
    const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
    res.json({ success: true, notifications, unreadCount });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/notifications/read-all', async (req, res) => {
  try { await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true }); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/banks', async (req, res) => {
  try { const banks = await Bank.find({ isActive: true }).select('bankName loanTypesSupported'); res.json({ success: true, banks }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
