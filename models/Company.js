const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true, trim: true },
  registrationNumber: { type: String, trim: true },
  gstNumber: { type: String, trim: true },
  address: { type: String },
  city: { type: String },
  pincode: { type: String },
  contactPerson: { type: String },
  mobile: { type: String },
  email: { type: String },
  logo: { type: String },
  bankingRelations: [{
    bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    joinedAt: { type: Date }
  }],
  connectorRelations: [{
    connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Connector' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    joinedAt: { type: Date }
  }],
  status: { type: String, enum: ['active', 'blocked', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
