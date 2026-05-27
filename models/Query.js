const mongoose = require('mongoose');
const replySchema = new mongoose.Schema({ repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, repliedByRole: String, message: String, repliedAt: { type: Date, default: Date.now } });
const querySchema = new mongoose.Schema({ leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadV2', required: true }, raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, raisedByRole: String, message: { type: String, required: true }, replies: [replySchema], status: { type: String, enum: ['open', 'closed'], default: 'open' } }, { timestamps: true });
module.exports = mongoose.model('Query', querySchema);
