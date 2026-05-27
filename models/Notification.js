const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userRole: { type: String, enum: ['admin', 'banker', 'connector', 'customer'] },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['lead', 'query', 'commission', 'sanction', 'disbursement', 'unlock', 'tat', 'general'], default: 'general' },
  refId: { type: mongoose.Schema.Types.ObjectId },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Notification', notificationSchema);
