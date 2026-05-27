const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect, requireRole } = require('../middleware/auth');
const LeadV2 = require('../models/LeadV2');
const BankerLeadAction = require('../models/BankerLeadAction');
const LoanStatusHistory = require('../models/LoanStatusHistory');
const UnlockApproval = require('../models/UnlockApproval');
const Query = require('../models/Query');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { applyLeadMask } = require('../utils/maskData');
const { createCommission } = require('../utils/commissionCalculator');
const { notifyBankerAccepted, notifyQueryRaised, notifyQueryReplied, notifySanctioned, notifyDisbursed } = require('../utils/notifications');

const sanctionStorage = multer.diskStorage({
  destination: (req, file, cb) => { const dir = path.join(__dirname, '../uploads/sanctions'); if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); cb(null, dir); },
  filename: (req, file, cb) => cb(null, `sanction-${Date.now()}${path.extname(file.originalname)}`),
});
const sanctionUpload = multer({ storage: sanctionStorage });

router.use(protect, requireRole('banker'));

const isUnlocked = async (leadId, bankerId) => {
  const approval = await UnlockApproval.findOne({ leadId, bankerId, approved: true });
  return !!approval;
};

router.get('/leads', async (req, res) => {
  try {
    const { status, loanType } = req.query;
    const filter = { assignedBankers: req.user._id };
    if (status) filter.overallStatus = status;
    if (loanType) filter.loanType = loanType;
    const leads = await LeadV2.find(filter).select('customerName customerMobile loanType cibilScore netSalary overallStatus createdAt bankStatuses').sort('-createdAt');
    const maskedLeads = leads.map(lead => applyLeadMask(lead, false));
    res.json({ success: true, leads: maskedLeads });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/leads/:id', async (req, res) => {
  try {
    const lead = await LeadV2.findOne({ _id: req.params.id, assignedBankers: req.user._id }).populate('connectorId','name email').populate('selectedBanks','bankName');
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found or not assigned' });
    const unlocked = await isUnlocked(lead._id, req.user._id);
    const action = await BankerLeadAction.findOne({ leadId: lead._id, bankerId: req.user._id }).sort('-actionedAt');
    res.json({ success: true, lead: applyLeadMask(lead, unlocked), isUnlocked: unlocked, bankerAction: action });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/accept', async (req, res) => {
  try {
    const lead = await LeadV2.findOne({ _id: req.params.id, assignedBankers: req.user._id });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await BankerLeadAction.findOneAndUpdate({ leadId: req.params.id, bankerId: req.user._id }, { action: 'accept', reason: '', actionedAt: new Date() }, { upsert: true, new: true });
    if (!lead.firstResponseAt) await LeadV2.findByIdAndUpdate(req.params.id, { firstResponseAt: new Date() });
    await LoanStatusHistory.create({ leadId: req.params.id, stage: 'Accepted', changedBy: req.user._id, changedByRole: 'banker', notes: 'Banker accepted the lead' });
    const banker = await User.findById(req.user._id);
    await notifyBankerAccepted({ connectorId: lead.connectorId, leadId: lead._id, bankerName: banker.name });
    res.json({ success: true, message: 'Lead accepted. Connector notified.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;
    const lead = await LeadV2.findOne({ _id: req.params.id, assignedBankers: req.user._id });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await BankerLeadAction.findOneAndUpdate({ leadId: req.params.id, bankerId: req.user._id }, { action: 'reject', reason: reason||'', actionedAt: new Date() }, { upsert: true, new: true });
    await LoanStatusHistory.create({ leadId: req.params.id, stage: 'Rejected', changedBy: req.user._id, changedByRole: 'banker', notes: reason||'Banker rejected the lead' });
    res.json({ success: true, message: 'Lead rejected.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/query', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message required' });
    const lead = await LeadV2.findOne({ _id: req.params.id, assignedBankers: req.user._id });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    const query = await Query.create({ leadId: req.params.id, raisedBy: req.user._id, raisedByRole: 'banker', message });
    const admin = await User.findOne({ role: 'admin' });
    const banker = await User.findById(req.user._id);
    await notifyQueryRaised({ connectorId: lead.connectorId, adminId: admin?._id, leadId: lead._id, bankerName: banker.name });
    res.status(201).json({ success: true, query });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/leads/:id/queries', async (req, res) => {
  try {
    const queries = await Query.find({ leadId: req.params.id }).populate('raisedBy','name role').populate('replies.repliedBy','name role').sort('-createdAt');
    res.json({ success: true, queries });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/status', async (req, res) => {
  try {
    const { stage, notes } = req.body;
    const VALID_STAGES = ['Lead Received','Accepted','Verification','Credit Review','Query Raised','Query Resolved','Sanctioned','Rejected','Agreement','Disbursement','Closed'];
    if (!VALID_STAGES.includes(stage)) return res.status(400).json({ success: false, message: 'Invalid stage' });
    const lead = await LeadV2.findOne({ _id: req.params.id, assignedBankers: req.user._id });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await LoanStatusHistory.create({ leadId: req.params.id, stage, changedBy: req.user._id, changedByRole: 'banker', notes: notes||'' });
    await LeadV2.updateOne({ _id: req.params.id, 'bankStatuses.bankerId': req.user._id }, { $set: { 'bankStatuses.$.stage': stage } });
    if (stage === 'Sanctioned') {
      await LeadV2.findByIdAndUpdate(req.params.id, { overallStatus: 'sanctioned', sanctionedAt: new Date() });
      const admin = await User.findOne({ role: 'admin' });
      await notifySanctioned({ connectorId: lead.connectorId, adminId: admin?._id, leadId: lead._id, loanType: lead.loanType });
    }
    res.json({ success: true, message: `Stage updated to "${stage}"` });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/sanction-upload', sanctionUpload.single('sanctionLetter'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const filePath = `/uploads/sanctions/${req.file.filename}`;
    await LeadV2.updateOne({ _id: req.params.id, 'bankStatuses.bankerId': req.user._id }, { $set: { 'bankStatuses.$.sanctionLetterPath': filePath } });
    res.json({ success: true, sanctionLetterPath: filePath });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/disbursement', async (req, res) => {
  try {
    const { disbursedAmount, disbursedDate } = req.body;
    if (!disbursedAmount) return res.status(400).json({ success: false, message: 'Disbursed amount required' });
    const lead = await LeadV2.findOne({ _id: req.params.id, assignedBankers: req.user._id });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await LeadV2.updateOne({ _id: req.params.id, 'bankStatuses.bankerId': req.user._id }, { $set: { 'bankStatuses.$.disbursedAmount': Number(disbursedAmount), 'bankStatuses.$.disbursedDate': new Date(disbursedDate||Date.now()), overallStatus: 'disbursed', disbursedAt: new Date(disbursedDate||Date.now()) } });
    await LoanStatusHistory.create({ leadId: req.params.id, stage: 'Disbursement', changedBy: req.user._id, changedByRole: 'banker', notes: `Disbursed ₹${Number(disbursedAmount).toLocaleString('en-IN')}` });
    await createCommission({ connectorId: lead.connectorId, leadId: lead._id, loanType: lead.loanType, loanAmount: Number(disbursedAmount) });
    const admin = await User.findOne({ role: 'admin' });
    await notifyDisbursed({ connectorId: lead.connectorId, adminId: admin?._id, leadId: lead._id, amount: disbursedAmount });
    res.json({ success: true, message: 'Disbursement recorded. Commission calculated.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/status-history/:leadId', async (req, res) => {
  try {
    const history = await LoanStatusHistory.find({ leadId: req.params.leadId }).populate('changedBy','name role').sort('changedAt');
    res.json({ success: true, history });
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

module.exports = router;
