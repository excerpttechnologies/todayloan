const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const User = require('../models/User');

router.get('/', protect, requireRole('admin', 'subadmin'), async (req, res) => {
  try {
    const { role, isActive } = req.query;
    const filter = {};
    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    const users = await User.find(filter).sort('-createdAt');
    res.json({ success: true, users });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.post('/create', protect, requireRole('admin'), async (req, res) => {
  try {
    const { name, email, mobile, password, role, bankId } = req.body;
    const allowedRoles = ['banker', 'connector', 'subadmin'];
    if (!allowedRoles.includes(role)) return res.status(400).json({ success: false, message: 'Invalid role' });
    const user = await User.create({ name, email, mobile, password, role, bankId, isVerified: true });
    if (role === 'connector') { user.connectorCode = 'DSA' + String(user._id).slice(-6).toUpperCase(); await user.save(); }
    res.status(201).json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id/toggle', protect, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.isActive = !user.isActive; await user.save();
    res.json({ success: true, message: `User ${user.isActive ? 'activated' : 'deactivated'}`, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
