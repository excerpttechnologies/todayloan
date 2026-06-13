const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bankName: { type: String, required: true, trim: true },
  dsaCode: { type: String, trim: true },
  supportedLoanTypes: [{ type: String }],
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  contactPerson: { type: String },
  mobile: { type: String },
  email: { type: String },
  companyRelations: [{
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    joinedAt: { type: Date }
  }],
  salesManagers: [{
    smId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    email: { type: String },
    employeeId: { type: String },
    assignedLoanTypes: [{ type: String }],
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }
  }],
  status: { type: String, enum: ['active', 'blocked', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);
