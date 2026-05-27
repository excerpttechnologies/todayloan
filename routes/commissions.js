const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const Commission = require('../models/Commission');

router.get('/my', protect, requireRole('connector'), async (req, res) => {
  try {
    const commissions = await Commission.find({ connectorId: req.user._id }).populate('leadId','customerName loanType').sort('-createdAt');
    const totalEarned = commissions.filter(c=>c.status==='paid').reduce((s,c)=>s+c.commissionAmount,0);
    const pending = commissions.filter(c=>c.status==='pending').reduce((s,c)=>s+c.commissionAmount,0);
    res.json({ success: true, commissions, totalEarned, pending });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const commissions = await Commission.find().populate('connectorId','name mobile connectorCode').populate('leadId','customerName loanType').sort('-createdAt');
    res.json({ success: true, commissions });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id/pay', protect, requireRole('admin'), async (req, res) => {
  try {
    const { paymentRef, overrideRate } = req.body;
    const update = { status: 'paid', paidDate: new Date(), paymentRef };
    if (overrideRate) { const c = await Commission.findById(req.params.id); update.overrideRate = Number(overrideRate); update.commissionRate = Number(overrideRate); update.commissionAmount = parseFloat(((c.loanAmount*overrideRate)/100).toFixed(2)); }
    const commission = await Commission.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, commission });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
