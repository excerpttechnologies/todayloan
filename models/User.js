const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['admin', 'company', 'bank', 'connector', 'sm'], required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  mobile: { type: String, trim: true },
  password: { type: String, required: true },
  profilePhoto: { type: String },
  status: { type: String, enum: ['active', 'blocked', 'spam', 'draft'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastLogin: { type: Date },
  refreshToken: { type: String },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
