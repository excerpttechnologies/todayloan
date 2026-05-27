const mongoose = require('mongoose');
const commissionSchema = new mongoose.Schema({
  connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadV2', required: true },
  loanType: String, loanAmount: Number,
  commissionRate: Number, commissionAmount: Number,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paidDate: Date, overrideRate: Number, paymentRef: String,
}, { timestamps: true });
module.exports = mongoose.model('Commission', commissionSchema);
