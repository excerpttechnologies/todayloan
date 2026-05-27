const mongoose = require('mongoose');
const unlockApprovalSchema = new mongoose.Schema({ connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, bankerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadV2' }, approved: { type: Boolean, default: false }, approvedAt: Date }, { timestamps: true });
module.exports = mongoose.model('UnlockApproval', unlockApprovalSchema);
