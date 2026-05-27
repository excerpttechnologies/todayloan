const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const { protect, requireRole } = require('../middleware/auth');
const LeadV2 = require('../models/LeadV2');
const User = require('../models/User');
const Bank = require('../models/Bank');
const BankUser = require('../models/BankUser');
const Query = require('../models/Query');
const Commission = require('../models/Commission');
const Notification = require('../models/Notification');
const LoanStatusHistory = require('../models/LoanStatusHistory');
const UnlockApproval = require('../models/UnlockApproval');
const LoanApplication = require('../models/LoanApplication');
const { notifyQueryReplied } = require('../utils/notifications');

const SLA = { 'First Response': 15*60*1000, Verification: 4*3600*1000, 'Credit Review': 24*3600*1000, Sanction: 48*3600*1000 };

router.use(protect, requireRole('admin','subadmin'));

// ── LEADS ──────────────────────────────────────────────────────────
router.get('/leads', async (req, res) => {
  try {
    const { status, loanType, connectorId, from, to, page=1, limit=25 } = req.query;
    const filter = {};
    if (status) filter.overallStatus = status;
    if (loanType) filter.loanType = loanType;
    if (connectorId) filter.connectorId = connectorId;
    if (from || to) { filter.createdAt = {}; if (from) filter.createdAt.$gte = new Date(from); if (to) filter.createdAt.$lte = new Date(to); }
    const leads = await LeadV2.find(filter).populate('connectorId','name email mobile').populate('selectedBanks','bankName').populate('assignedBankers','name email').sort('-createdAt').skip((page-1)*limit).limit(Number(limit));
    const total = await LeadV2.countDocuments(filter);
    res.json({ success: true, leads, total, page: Number(page), pages: Math.ceil(total/limit) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/leads/:id', async (req, res) => {
  try {
    const lead = await LeadV2.findById(req.params.id).populate('connectorId','name email mobile').populate('selectedBanks','bankName').populate('assignedBankers','name email');
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    const history = await LoanStatusHistory.find({ leadId: req.params.id }).populate('changedBy','name role').sort('changedAt');
    res.json({ success: true, lead, history });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/assign', async (req, res) => {
  try {
    const { bankerId } = req.body;
    await LeadV2.findByIdAndUpdate(req.params.id, { $addToSet: { assignedBankers: bankerId } });
    res.json({ success: true, message: 'Banker assigned' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/override-unlock', async (req, res) => {
  try {
    const { bankerId } = req.body;
    const lead = await LeadV2.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    await UnlockApproval.findOneAndUpdate({ leadId: req.params.id, bankerId, connectorId: lead.connectorId }, { approved: true, approvedAt: new Date() }, { upsert: true, new: true });
    res.json({ success: true, message: 'Unlock overridden by admin' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/leads/:id/status', async (req, res) => {
  try {
    const { stage, notes } = req.body;
    await LoanStatusHistory.create({ leadId: req.params.id, stage, changedBy: req.user._id, changedByRole: 'admin', notes: notes||'' });
    await LeadV2.findByIdAndUpdate(req.params.id, { overallStatus: stage.toLowerCase() });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── USER MANAGEMENT ────────────────────────────────────────────────
router.get('/connectors', async (req, res) => {
  try { const connectors = await User.find({ role: 'connector' }).sort('-createdAt'); res.json({ success: true, connectors }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/connectors', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const user = await User.create({ name, email, mobile, password, role: 'connector', isVerified: true });
    user.connectorCode = 'DSA' + String(user._id).slice(-6).toUpperCase(); await user.save();
    res.status(201).json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/connectors/:id', async (req, res) => {
  try {
    const { name, email, mobile, isActive } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, mobile, isActive }, { new: true });
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/bankers', async (req, res) => {
  try {
    const bankers = await User.find({ role: 'banker' }).sort('-createdAt');
    const bankAssignments = await BankUser.find().populate('bankId','bankName');
    const result = bankers.map(b => ({ ...b.toObject(), assignedBanks: bankAssignments.filter(a => a.bankerId.toString() === b._id.toString()).map(a => a.bankId) }));
    res.json({ success: true, bankers: result });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/bankers', async (req, res) => {
  try {
    const { name, email, mobile, password, bankId } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Missing fields' });
    const user = await User.create({ name, email, mobile, password, role: 'banker', isVerified: true, mustChangePassword: true });
    if (bankId) await BankUser.create({ bankerId: user._id, bankId });
    res.status(201).json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/bankers/:id', async (req, res) => {
  try {
    const { name, email, mobile, isActive, bankId } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, mobile, isActive }, { new: true });
    if (bankId) await BankUser.findOneAndUpdate({ bankerId: req.params.id }, { bankId }, { upsert: true });
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── BANKS ──────────────────────────────────────────────────────────
router.get('/banks', async (req, res) => {
  try { const banks = await Bank.find().sort('-createdAt'); res.json({ success: true, banks }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/banks', async (req, res) => {
  try { const bank = await Bank.create(req.body); res.status(201).json({ success: true, bank }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/banks/:id', async (req, res) => {
  try { const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ success: true, bank }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── QUERIES ────────────────────────────────────────────────────────
router.get('/queries', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const queries = await Query.find(filter).populate('leadId','customerName loanType').populate('raisedBy','name role').populate('replies.repliedBy','name role').sort('-createdAt');
    res.json({ success: true, queries });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/queries/:id/reply', async (req, res) => {
  try {
    const { message, close } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Reply required' });
    const query = await Query.findByIdAndUpdate(req.params.id, { $push: { replies: { repliedBy: req.user._id, repliedByRole: 'admin', message, repliedAt: new Date() } }, ...(close ? { status: 'closed' } : {}) }, { new: true }).populate('raisedBy','_id name');
    await notifyQueryReplied({ bankerId: query.raisedBy._id, leadId: query.leadId, replierName: 'Admin' });
    res.json({ success: true, query });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── COMMISSIONS ────────────────────────────────────────────────────
router.get('/commissions', async (req, res) => {
  try {
    const { status, connectorId } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (connectorId) filter.connectorId = connectorId;
    const commissions = await Commission.find(filter).populate('connectorId','name email connectorCode').populate('leadId','customerName loanType').sort('-createdAt');
    const total = commissions.reduce((s,c)=>s+c.commissionAmount,0);
    const paid  = commissions.filter(c=>c.status==='paid').reduce((s,c)=>s+c.commissionAmount,0);
    res.json({ success: true, commissions, summary: { total, paid, pending: total-paid } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/commissions/:id/pay', async (req, res) => {
  try {
    const { paymentRef, overrideRate } = req.body;
    const update = { status: 'paid', paidDate: new Date(), paymentRef };
    if (overrideRate) { const c = await Commission.findById(req.params.id); update.overrideRate = Number(overrideRate); update.commissionRate = Number(overrideRate); update.commissionAmount = parseFloat(((c.loanAmount*overrideRate)/100).toFixed(2)); }
    const commission = await Commission.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, commission });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── ANALYTICS ──────────────────────────────────────────────────────
router.get('/analytics', async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalLeads, todayLeads, monthLeads, sanctioned, disbursed, pending, loanTypeDist, bankConversion, connectorPerf, monthlyTrend, totalApps, sanctionedApps, totalCustomers, totalBankers, totalConnectors] = await Promise.all([
      LeadV2.countDocuments(), LeadV2.countDocuments({ createdAt:{ $gte:today } }), LeadV2.countDocuments({ createdAt:{ $gte:monthStart } }),
      LeadV2.countDocuments({ overallStatus:'sanctioned' }), LeadV2.countDocuments({ overallStatus:'disbursed' }), LeadV2.countDocuments({ overallStatus:{ $in:['submitted','processing'] } }),
      LeadV2.aggregate([{ $group:{ _id:'$loanType', count:{ $sum:1 } } }]),
      LeadV2.aggregate([{ $unwind:'$selectedBanks' },{ $group:{ _id:'$selectedBanks', total:{ $sum:1 }, sanctioned:{ $sum:{ $cond:[{ $eq:['$overallStatus','sanctioned'] },1,0] } } } },{ $lookup:{ from:'banks', localField:'_id', foreignField:'_id', as:'bank' } },{ $unwind:{ path:'$bank', preserveNullAndEmptyArrays:true } },{ $project:{ bankName:'$bank.bankName', total:1, sanctioned:1, conversionRate:{ $cond:['$total',{ $multiply:[{ $divide:['$sanctioned','$total'] },100] },0] } } }]),
      LeadV2.aggregate([{ $group:{ _id:'$connectorId', total:{ $sum:1 }, sanctioned:{ $sum:{ $cond:[{ $eq:['$overallStatus','sanctioned'] },1,0] } } } },{ $lookup:{ from:'users', localField:'_id', foreignField:'_id', as:'connector' } },{ $unwind:{ path:'$connector', preserveNullAndEmptyArrays:true } },{ $project:{ connectorName:'$connector.name', total:1, sanctioned:1 } },{ $sort:{ total:-1 } },{ $limit:10 }]),
      LeadV2.aggregate([{ $group:{ _id:{ year:{ $year:'$createdAt' }, month:{ $month:'$createdAt' } }, count:{ $sum:1 } } },{ $sort:{ '_id.year':1, '_id.month':1 } },{ $limit:12 }]),
      LoanApplication.countDocuments(), LoanApplication.countDocuments({ status:'sanctioned' }),
      User.countDocuments({ role:'customer' }), User.countDocuments({ role:'banker' }), User.countDocuments({ role:'connector' }),
    ]);
    res.json({ success:true, summary:{ totalLeads, todayLeads, monthLeads, sanctioned, disbursed, pending, totalApps, sanctionedApps, totalCustomers, totalBankers, totalConnectors }, charts:{ loanTypeDist, bankConversion, connectorPerf, monthlyTrend } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── TAT MONITORING ─────────────────────────────────────────────────
router.get('/tat', async (req, res) => {
  try {
    const leads = await LeadV2.find({ overallStatus:{ $in:['submitted','processing'] } }).select('customerName loanType submittedAt firstResponseAt sanctionedAt overallStatus').sort('-submittedAt');
    const now = Date.now();
    const results = leads.map(lead => {
      const breaches = [];
      const age = now - new Date(lead.submittedAt).getTime();
      if (!lead.firstResponseAt && age > SLA['First Response']) breaches.push({ stage:'First Response', sla:'15 mins', elapsed: Math.round(age/60000)+' mins' });
      if (!lead.sanctionedAt && age > SLA['Sanction']) breaches.push({ stage:'Sanction', sla:'48 hrs', elapsed: Math.round(age/3600000)+' hrs' });
      return { _id: lead._id, customerName: lead.customerName, loanType: lead.loanType, submittedAt: lead.submittedAt, overallStatus: lead.overallStatus, breaches, isBreach: breaches.length > 0 };
    });
    res.json({ success: true, leads: results, breachedCount: results.filter(r=>r.isBreach).length });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── CSV EXPORT ─────────────────────────────────────────────────────
router.get('/reports/export', async (req, res) => {
  try {
    const { type='leads', from, to } = req.query;
    let data = [], fields = [];
    const dateFilter = {};
    if (from) dateFilter.$gte = new Date(from);
    if (to)   dateFilter.$lte = new Date(to);

    if (type === 'leads') {
      const filter = Object.keys(dateFilter).length ? { createdAt: dateFilter } : {};
      const leads = await LeadV2.find(filter).populate('connectorId','name').populate('selectedBanks','bankName').lean();
      data = leads.map(l => ({ 'ID': l._id, 'Customer': l.customerName, 'Mobile': l.customerMobile, 'Loan Type': l.loanType, 'Status': l.overallStatus, 'Connector': l.connectorId?.name, 'CIBIL': l.cibilScore, 'Salary': l.netSalary, 'Date': new Date(l.createdAt).toLocaleDateString('en-IN') }));
      fields = ['ID','Customer','Mobile','Loan Type','Status','Connector','CIBIL','Salary','Date'];
    } else if (type === 'commissions') {
      const commissions = await Commission.find().populate('connectorId','name connectorCode').populate('leadId','customerName loanType').lean();
      data = commissions.map(c => ({ 'Connector': c.connectorId?.name, 'DSA Code': c.connectorId?.connectorCode, 'Customer': c.leadId?.customerName, 'Loan Type': c.loanType, 'Amount': c.loanAmount, 'Rate %': c.commissionRate, 'Commission': c.commissionAmount, 'Status': c.status, 'Paid Date': c.paidDate ? new Date(c.paidDate).toLocaleDateString('en-IN') : '-' }));
      fields = ['Connector','DSA Code','Customer','Loan Type','Amount','Rate %','Commission','Status','Paid Date'];
    }

    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${type}-${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── NOTIFICATIONS ──────────────────────────────────────────────────
router.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort('-createdAt').limit(60);
    const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
    res.json({ success: true, notifications, unreadCount });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/notifications/read-all', async (req, res) => {
  try { await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true }); res.json({ success: true }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
