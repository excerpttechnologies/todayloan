// routes/loans.js - Customer loan applications
const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const LoanApplication = require('../models/LoanApplication');
const Bank = require('../models/Bank');
const upload = require('../config/multer');

const maskData = (app) => ({
  name:   (app.personalDetails?.name||'User').slice(0,1)+'****'+(app.personalDetails?.name||'r').slice(-1),
  mobile: (app.personalDetails?.mobile||'9800000000').slice(0,2)+'XXXX'+(app.personalDetails?.mobile||'0000').slice(-4),
  email:  app.personalDetails?.email ? app.personalDetails.email.split('@')[0].slice(0,2)+'***@'+app.personalDetails.email.split('@')[1] : 'c***@mail.com',
});

const checkEligibility = (app) => {
  let eligible = true; let remarks = [];
  if (app.loanType==='personal') {
    if (app.employmentDetails?.salary && app.employmentDetails.salary < 25000) { eligible=false; remarks.push('Salary below ₹25,000'); }
    if (app.financialDetails?.cibilScore && app.financialDetails.cibilScore < 700) { eligible=false; remarks.push('CIBIL below 700'); }
  }
  return { eligible, remarks: remarks.join(', ') || 'All checks passed' };
};

router.post('/apply', protect, requireRole('customer','connector'), async (req, res) => {
  try {
    const application = await LoanApplication.create({ ...req.body, customer: req.user._id, status: 'submitted' });
    const { eligible, remarks } = checkEligibility(application);
    application.eligibilityStatus = eligible ? 'eligible' : 'ineligible';
    application.eligibilityRemarks = remarks;
    if (eligible) application.status = 'distributed';
    await application.save();
    res.status(201).json({ success: true, application });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/my', protect, async (req, res) => {
  try {
    const applications = await LoanApplication.find({ customer: req.user._id }).sort('-createdAt');
    res.json({ success: true, applications });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/', protect, requireRole('admin','subadmin'), async (req, res) => {
  try {
    const { status, loanType, page=1, limit=20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (loanType) filter.loanType = loanType;
    const applications = await LoanApplication.find(filter).populate('customer','name mobile email').populate('connector','name').sort('-createdAt').skip((page-1)*limit).limit(Number(limit));
    const total = await LoanApplication.countDocuments(filter);
    res.json({ success: true, applications, total, page: Number(page), pages: Math.ceil(total/limit) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const application = await LoanApplication.findById(req.params.id).populate('customer','name email mobile');
    if (!application) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, application });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
