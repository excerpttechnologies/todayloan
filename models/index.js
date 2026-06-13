const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['join_request','application','stage_update','query','unmask','commission','message','general'], default: 'general' },
  relatedId: { type: mongoose.Schema.Types.ObjectId },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const joinRequestSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromRole: { type: String, enum: ['connector', 'bank'], required: true },
  toCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now },
  respondedAt: Date,
  responseNote: String
});

const messageSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  broadcastRole: { type: String },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  thread: [{
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fromName: String,
    body: String,
    sentAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const commissionSchema = new mongoose.Schema({
  connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Connector', required: true },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'LoanApplication', required: true },
  loanType: String,
  loanAmount: Number,
  commissionRate: Number,
  commissionAmount: Number,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paidAt: Date
}, { timestamps: true });

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  action: String,
  targetId: mongoose.Schema.Types.ObjectId,
  targetType: String,
  description: String,
  ipAddress: String,
}, { timestamps: true });

module.exports = {
  Notification: mongoose.model('Notification', notificationSchema),
  JoinRequest: mongoose.model('JoinRequest', joinRequestSchema),
  Message: mongoose.model('Message', messageSchema),
  Commission: mongoose.model('Commission', commissionSchema),
  AuditLog: mongoose.model('AuditLog', auditLogSchema)
};
