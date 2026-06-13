const mongoose = require('mongoose');

const connectorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  mobile: { type: String },
  email: { type: String },
  companyRelations: [{
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    joinedAt: { type: Date }
  }],
  totalLeads: { type: Number, default: 0 },
  totalApproved: { type: Number, default: 0 },
  totalCommission: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'blocked', 'spam'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Connector', connectorSchema);
