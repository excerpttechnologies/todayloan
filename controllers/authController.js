const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const Connector = require('../models/Connector');
const { generateTokens } = require('../middleware/auth');
const { maskMobile, maskEmail, maskAadhaar, maskPAN } = require('../utils/masking');
const { AuditLog } = require('../models/index');

exports.register = async (req, res) => {
  try {
    const { role, name, email, mobile, password, companyName, registrationNumber, gstNumber, address, city, pincode, dsaCode, bankName } = req.body;
    
    if (!['company', 'bank', 'connector'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role for self-registration' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ role, name, email, mobile, password });

    if (role === 'company') {
      await Company.create({ userId: user._id, companyName: companyName || name, registrationNumber, gstNumber, address, city, pincode, email, mobile });
    } else if (role === 'bank') {
      await Bank.create({ userId: user._id, bankName: bankName || name, dsaCode, address, city, email, mobile });
    } else if (role === 'connector') {
      await Connector.create({ userId: user._id, name, mobile: maskMobile(mobile), email, status: 'active' });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken, lastLogin: new Date() });

    res.status(201).json({ accessToken, user: user.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.status === 'blocked') return res.status(403).json({ message: 'Account blocked. Contact admin.' });

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const { accessToken, refreshToken } = generateTokens(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken, lastLogin: new Date() });

    await AuditLog.create({ userId: user._id, role: user.role, action: 'LOGIN', description: `${user.name} logged in`, ipAddress: req.ip });

    res.json({ accessToken, user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
    
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid refresh token' });

    const tokens = generateTokens(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken: tokens.refreshToken });
    res.json(tokens);
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

exports.logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = req.user.toJSON();
    let profile = null;
    if (user.role === 'company') profile = await Company.findOne({ userId: user._id });
    else if (user.role === 'bank') profile = await Bank.findOne({ userId: user._id });
    else if (user.role === 'connector') profile = await Connector.findOne({ userId: user._id });
    else if (user.role === 'sm') {
      const bank = await Bank.findOne({ 'salesManagers.smId': user._id });
      if (bank) {
        const sm = bank.salesManagers.find(s => s.smId.toString() === user._id.toString());
        profile = { bankId: bank._id, bankName: bank.bankName, ...sm?.toObject() };
      }
    }
    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const valid = await user.comparePassword(currentPassword);
    if (!valid) return res.status(400).json({ message: 'Current password is incorrect' });
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
