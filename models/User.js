const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:             { type: String, required: true, trim: true },
  email:            { type: String, unique: true, sparse: true, lowercase: true },
  mobile:           { type: String, unique: true, sparse: true },
  password:         { type: String },
  role:             { type: String, enum: ['customer', 'connector', 'banker', 'admin', 'subadmin'], default: 'customer' },
  avatar:           { type: String, default: '' },
  isActive:         { type: Boolean, default: true },
  isVerified:       { type: Boolean, default: false },
  mustChangePassword: { type: Boolean, default: false },
  googleId:         { type: String },
  otp:              { type: String },
  otpExpiry:        { type: Date },
  lastLogin:        { type: Date },
  // Banker
  bankId:           { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
  assignedLoanTypes: [{ type: String }],
  parentBanker:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // ← ADD
  // Connector
  connectorCode:    { type: String, unique: true, sparse: true },
  connectorPlan:    { type: String, enum: ['basic', 'pro', 'enterprise'], default: 'basic' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.otp;
  delete obj.otpExpiry;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
