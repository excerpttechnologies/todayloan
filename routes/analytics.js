const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const LoanApplication = require('../models/LoanApplication');
const LeadV2 = require('../models/LeadV2');
const User = require('../models/User');
const Commission = require('../models/Commission');

router.get('/admin', protect, requireRole('admin','subadmin'), async (req, res) => {
  try {
    const [totalApplications, sanctionedApps, disbursedApps, totalCustomers, totalBankers, totalConnectors, loanTypeBreakdown, statusBreakdown, recentApplications] = await Promise.all([
      LoanApplication.countDocuments(), LoanApplication.countDocuments({ status:'sanctioned' }), LoanApplication.countDocuments({ status:'disbursed' }),
      User.countDocuments({ role:'customer' }), User.countDocuments({ role:'banker' }), User.countDocuments({ role:'connector' }),
      LoanApplication.aggregate([{ $group: { _id:'$loanType', count:{ $sum:1 }, totalAmount:{ $sum:'$loanAmount' } } }]),
      LoanApplication.aggregate([{ $group: { _id:'$status', count:{ $sum:1 } } }]),
      LoanApplication.find().sort('-createdAt').limit(10).populate('customer','name mobile'),
    ]);
    res.json({ success:true, stats:{ totalApplications, sanctionedApps, disbursedApps, totalCustomers, totalBankers, totalConnectors }, loanTypeBreakdown, statusBreakdown, recentApplications });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/connector', protect, requireRole('connector'), async (req, res) => {
  try {
    const connectorId = req.user._id;
    const [totalLeads, pendingLeads, approvedLeads, commissions] = await Promise.all([
      LeadV2.countDocuments({ connectorId }), LeadV2.countDocuments({ connectorId, overallStatus:{ $in:['submitted','processing'] } }),
      LeadV2.countDocuments({ connectorId, overallStatus:{ $in:['sanctioned','disbursed'] } }),
      Commission.find({ connectorId }).sort('-createdAt').limit(20),
    ]);
    const totalEarnings = commissions.filter(c=>c.status==='paid').reduce((s,c)=>s+c.commissionAmount,0);
    const pendingEarnings = commissions.filter(c=>c.status==='pending').reduce((s,c)=>s+c.commissionAmount,0);
    res.json({ success:true, stats:{ totalLeads, pendingLeads, approvedLeads, totalEarnings, pendingEarnings }, commissions });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
