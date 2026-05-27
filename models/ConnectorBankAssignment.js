const mongoose = require('mongoose');
const connectorBankAssignmentSchema = new mongoose.Schema({ connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' }, leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadV2' }, status: { type: String, enum: ['submitted', 'accepted', 'rejected'], default: 'submitted' }, submittedAt: { type: Date, default: Date.now } }, { timestamps: true });
module.exports = mongoose.model('ConnectorBankAssignment', connectorBankAssignmentSchema);
