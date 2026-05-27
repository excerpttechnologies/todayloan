const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const LoanApplication = require('../models/LoanApplication');

router.post('/add', protect, requireRole('connector','admin'), async (req, res) => {
  try {
    const application = await LoanApplication.create({ ...req.body, connector: req.user._id, source: 'connector', status: 'submitted' });
    res.status(201).json({ success: true, application });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/my', protect, requireRole('connector'), async (req, res) => {
  try {
    const leads = await LoanApplication.find({ connector: req.user._id }).populate('customer','name mobile').sort('-createdAt');
    res.json({ success: true, leads });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:applicationId/bank-status', protect, async (req, res) => {
  try { res.json({ success: true, bankLeads: [] }); }
  catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
