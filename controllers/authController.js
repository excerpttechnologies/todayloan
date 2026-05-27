const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' });
const generateOTP   = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;
    const allowedRoles = ['customer', 'connector'];
    const userRole = allowedRoles.includes(role) ? role : 'customer';
    const existing = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existing) return res.status(400).json({ success: false, message: 'User already exists with this email or mobile' });
    const user = await User.create({ name, email, mobile, password, role: userRole, isVerified: false });
    if (userRole === 'connector') { user.connectorCode = 'DSA' + String(user._id).slice(-6).toUpperCase(); await user.save(); }
    res.status(201).json({ success: true, message: 'Account created', token: generateToken(user._id), user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
    const query = email ? { email } : { mobile };
    const user = await User.findOne(query).select('+password');
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    if (!user.isActive) return res.status(401).json({ success: false, message: 'Account deactivated. Contact admin.' });
    user.lastLogin = new Date(); await user.save();
    res.json({ success: true, token: generateToken(user._id), user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const requestOTP = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ success: false, message: 'Mobile required' });
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    let user = await User.findOne({ mobile });
    if (!user) user = await User.create({ mobile, name: 'User', otp, otpExpiry, isVerified: false });
    else { user.otp = otp; user.otpExpiry = otpExpiry; await user.save(); }
    console.log(`OTP for ${mobile}: ${otp}`);
    res.json({ success: true, message: 'OTP sent', ...(process.env.NODE_ENV === 'development' && { otp }) });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' });
    if (new Date() > user.otpExpiry) return res.status(400).json({ success: false, message: 'OTP expired' });
    user.isVerified = true; user.otp = undefined; user.otpExpiry = undefined; user.lastLogin = new Date();
    await user.save();
    res.json({ success: true, token: generateToken(user._id), user, isNewUser: !user.name || user.name === 'User' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

const getMe = async (req, res) => res.json({ success: true, user: req.user });

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const update = { name, email };
    if (req.file) update.avatar = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

module.exports = { register, login, requestOTP, verifyOTP, getMe, updateProfile };
