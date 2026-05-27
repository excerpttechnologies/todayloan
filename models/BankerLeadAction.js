const mongoose = require('mongoose');
const bankerLeadActionSchema = new mongoose.Schema({ bankerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadV2' }, action: { type: String, enum: ['accept', 'reject', 'hold'] }, reason: { type: String, default: '' }, actionedAt: { type: Date, default: Date.now } }, { timestamps: true });
module.exports = mongoose.model('BankerLeadAction', bankerLeadActionSchema);
