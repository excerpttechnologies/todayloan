const mongoose = require('mongoose');
const loanStatusHistorySchema = new mongoose.Schema({ leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadV2' }, stage: String, changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, changedByRole: String, notes: { type: String, default: '' }, changedAt: { type: Date, default: Date.now } }, { timestamps: true });
module.exports = mongoose.model('LoanStatusHistory', loanStatusHistorySchema);
