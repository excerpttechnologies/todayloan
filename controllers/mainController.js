const Company = require('../models/Company');
const Bank = require('../models/Bank');
const Connector = require('../models/Connector');
const User = require('../models/User');
const LoanApplication = require('../models/LoanApplication');
const { JoinRequest, Notification, Message, Commission } = require('../models/index');
const { sendNotification } = require('../utils/notifications');

// JOIN REQUESTS
exports.sendJoinRequest = async (req, res) => {
  try {
    const { companyId } = req.body;
    const fromRole = req.user.role;
    if (!['connector','bank'].includes(fromRole)) return res.status(400).json({ message: 'Only connectors and banks can send join requests' });
    
    const existing = await JoinRequest.findOne({ fromUserId: req.user._id, toCompanyId: companyId, status: 'pending' });
    if (existing) return res.status(400).json({ message: 'Join request already sent' });

    const request = await JoinRequest.create({ fromUserId: req.user._id, fromRole, toCompanyId: companyId });
    
    const company = await Company.findById(companyId);
    if (company?.userId) {
      await sendNotification(company.userId, 'New Join Request', `${req.user.name} wants to join your company`, 'join_request', request._id);
    }
    
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIncomingRequests = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    
    const requests = await JoinRequest.find({ toCompanyId: company._id })
      .populate('fromUserId', 'name email mobile role')
      .sort({ requestedAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSentRequests = async (req, res) => {
  try {
    const requests = await JoinRequest.find({ fromUserId: req.user._id })
      .populate('toCompanyId', 'companyName city email')
      .sort({ requestedAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.respondToRequest = async (req, res) => {
  try {
    const { status, responseNote } = req.body;
    const request = await JoinRequest.findByIdAndUpdate(req.params.id, { status, responseNote, respondedAt: new Date() }, { new: true });
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (status === 'approved') {
      const company = await Company.findOne({ userId: req.user._id });
      if (request.fromRole === 'connector') {
        await Connector.findOneAndUpdate({ userId: request.fromUserId }, { $push: { companyRelations: { companyId: company._id, status: 'approved', joinedAt: new Date() } } });
        await Company.findByIdAndUpdate(company._id, { $push: { connectorRelations: { connectorId: request.fromUserId, status: 'approved', joinedAt: new Date() } } });
      } else if (request.fromRole === 'bank') {
        const bank = await Bank.findOneAndUpdate({ userId: request.fromUserId }, { $push: { companyRelations: { companyId: company._id, status: 'approved', joinedAt: new Date() } } }, { new: true });
        await Company.findByIdAndUpdate(company._id, { $push: { bankingRelations: { bankId: bank._id, status: 'approved', joinedAt: new Date() } } });
      }
    }

    await sendNotification(request.fromUserId, 'Join Request Update', `Your join request has been ${status}`, 'join_request', request._id);
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// NOTIFICATIONS
exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, type, isRead } = req.query;
    const query = { userId: req.user._id };
    if (type) query.type = type;
    if (isRead !== undefined) query.isRead = isRead === 'true';
    const notifications = await Notification.find(query).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit));
    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
    res.json({ notifications, total, unreadCount, pages: Math.ceil(total/Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
    res.json({ message: 'All marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MESSAGES
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ $or: [{ toUserId: req.user._id }, { fromUserId: req.user._id }] })
      .populate('fromUserId', 'name role')
      .populate('toUserId', 'name role')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { toUserId, subject, body, broadcastRole } = req.body;
    const msg = await Message.create({ fromUserId: req.user._id, toUserId, subject, body, broadcastRole });
    if (toUserId) {
      await sendNotification(toUserId, 'New Message', `${req.user.name}: ${subject}`, 'message', msg._id);
    } else if (broadcastRole) {
      const users = await User.find({ role: broadcastRole, status: 'active' });
      for (const u of users) {
        await sendNotification(u._id, 'Broadcast Message', `${req.user.name}: ${subject}`, 'message', msg._id);
      }
    }
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.replyMessage = async (req, res) => {
  try {
    const { body } = req.body;
    const msg = await Message.findByIdAndUpdate(req.params.id, {
      $push: { thread: { from: req.user._id, fromName: req.user.name, body, sentAt: new Date() } }
    }, { new: true });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DASHBOARD (role-aware)
exports.getDashboard = async (req, res) => {
  try {
    const { role, _id } = req.user;
    let stats = {};

    if (role === 'connector') {
      const connector = await Connector.findOne({ userId: _id });
      if (connector) {
        const apps = await LoanApplication.find({ connectorId: connector._id });
        const commissions = await Commission.find({ connectorId: connector._id });
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        stats = {
          totalApplications: apps.length,
          pendingApplications: apps.filter(a => a.overallStatus === 'active').length,
          approvedApplications: apps.filter(a => a.bankAssignments?.some(ba => ba.status === 'sanctioned')).length,
          totalCommission: commissions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0),
          monthCommission: commissions.filter(c => c.createdAt >= monthStart).reduce((sum, c) => sum + (c.commissionAmount || 0), 0),
          loanTypeBreakdown: apps.reduce((acc, a) => { acc[a.loanType] = (acc[a.loanType] || 0) + 1; return acc; }, {}),
          connectedCompanies: connector.companyRelations?.filter(r => r.status === 'approved').length || 0
        };
      }
    } else if (role === 'company') {
      const company = await Company.findOne({ userId: _id });
      if (company) {
        const apps = await LoanApplication.find({ companyId: company._id });
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        stats = {
          totalConnectors: company.connectorRelations?.filter(r => r.status === 'approved').length || 0,
          totalBanks: company.bankingRelations?.filter(r => r.status === 'approved').length || 0,
          totalApplications: apps.length,
          monthApplications: apps.filter(a => a.createdAt >= monthStart).length,
          pendingRequests: await JoinRequest.countDocuments({ toCompanyId: company._id, status: 'pending' })
        };
      }
    } else if (role === 'bank') {
      const bank = await Bank.findOne({ userId: _id });
      if (bank) {
        const apps = await LoanApplication.find({ 'bankAssignments.bankId': bank._id });
        const allAssignments = apps.flatMap(a => a.bankAssignments.filter(ba => ba.bankId?.toString() === bank._id.toString()));
        stats = {
          totalLeads: allAssignments.length,
          accepted: allAssignments.filter(ba => ['accepted','login','verification','credit_review','sanctioned','disbursement'].includes(ba.status)).length,
          sanctioned: allAssignments.filter(ba => ba.status === 'sanctioned').length,
          disbursed: allAssignments.filter(ba => ba.status === 'disbursement').length,
          rejected: allAssignments.filter(ba => ba.status === 'rejected').length,
          pendingQueries: allAssignments.flatMap(ba => ba.queries || []).filter(q => q.status === 'pending').length
        };
      }
    }

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMMISSIONS
exports.getCommissions = async (req, res) => {
  try {
    const { role, _id } = req.user;
    let query = {};
    if (role === 'connector') {
      const connector = await Connector.findOne({ userId: _id });
      if (connector) query.connectorId = connector._id;
    }
    const commissions = await Commission.find(query).populate('applicationId', 'applicationId loanType loanAmount').sort({ createdAt: -1 });
    const total = commissions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
    res.json({ commissions, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMPANIES LIST (for connectors/banks to browse)
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ status: 'active' }).populate('userId', 'name email');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBanks = async (req, res) => {
  try {
    const { loanType } = req.query;
    const query = { status: 'active' };
    if (loanType) query.supportedLoanTypes = loanType;
    const banks = await Bank.find(query);
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BANK - SM MANAGEMENT
exports.createSM = async (req, res) => {
  try {
    const bank = await Bank.findOne({ userId: req.user._id });
    if (!bank) return res.status(404).json({ message: 'Bank not found' });

    const { name, email, mobile, employeeId, assignedLoanTypes, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const smUser = await User.create({ role: 'sm', name, email, mobile, password: password || 'SM@123' });
    bank.salesManagers.push({ smId: smUser._id, name, email, employeeId, assignedLoanTypes, status: 'active' });
    await bank.save();

    res.status(201).json({ user: smUser.toJSON(), bank });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSMs = async (req, res) => {
  try {
    const bank = await Bank.findOne({ userId: req.user._id });
    if (!bank) return res.status(404).json({ message: 'Bank not found' });
    res.json(bank.salesManagers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// COMPANY — connectors under them
exports.getCompanyConnectors = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const connectorIds = company.connectorRelations.filter(r => r.status === 'approved').map(r => r.connectorId);
    const connectors = await Connector.find({ _id: { $in: connectorIds } }).populate('userId', 'name email mobile');
    res.json(connectors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompanyBanks = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    const bankIds = company.bankingRelations.filter(r => r.status === 'approved').map(r => r.bankId);
    const banks = await Bank.find({ _id: { $in: bankIds } });
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
