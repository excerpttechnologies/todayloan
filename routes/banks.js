const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const Bank = require('../models/Bank');
const upload = require('../config/multer');

router.get('/', protect, async (req, res) => {
  try {
    const banks = await Bank.find({ isActive: true }).populate('assignedManagers', 'name email');
    res.json({ success: true, banks });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const bank = await Bank.findById(req.params.id).populate('assignedManagers', 'name email mobile');
    if (!bank) return res.status(404).json({ success: false, message: 'Bank not found' });
    res.json({ success: true, bank });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/', protect, requireRole('admin'), upload.single('logo'), async (req, res) => {
  try {
    const bankData = { ...req.body };
    if (req.file) bankData.logo = `/uploads/${req.file.filename}`;
    if (typeof bankData.loanTypesSupported === 'string') {
      try { bankData.loanTypesSupported = JSON.parse(bankData.loanTypesSupported); } catch { bankData.loanTypesSupported = []; }
    }
    const bank = await Bank.create(bankData);
    res.status(201).json({ success: true, bank });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id', protect, requireRole('admin'), upload.single('logo'), async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.logo = `/uploads/${req.file.filename}`;
    if (typeof update.loanTypesSupported === 'string') {
      try { update.loanTypesSupported = JSON.parse(update.loanTypesSupported); } catch { update.loanTypesSupported = []; }
    }
    const bank = await Bank.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ success: true, bank });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    await Bank.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Bank deactivated' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
