// const Company = require('../models/Company');
// const Bank = require('../models/Bank');

// const Connector = require('../models/Connector');
// const User = require('../models/User');
// const LoanApplication = require('../models/LoanApplication');
// const { JoinRequest, Notification, Message, Commission } = require('../models/index');
// const { sendNotification } = require('../utils/notifications');

// // JOIN REQUESTS
// exports.sendJoinRequest = async (req, res) => {
//   try {
//     const { companyId } = req.body;
//     const fromRole = req.user.role;
//     if (!['connector','bank'].includes(fromRole)) return res.status(400).json({ message: 'Only connectors and banks can send join requests' });
    
//     const existing = await JoinRequest.findOne({ fromUserId: req.user._id, toCompanyId: companyId, status: 'pending' });
//     if (existing) return res.status(400).json({ message: 'Join request already sent' });

//     const request = await JoinRequest.create({ fromUserId: req.user._id, fromRole, toCompanyId: companyId });
    
//     const company = await Company.findById(companyId);
//     if (company?.userId) {
//       await sendNotification(company.userId, 'New Join Request', `${req.user.name} wants to join your company`, 'join_request', request._id);
//     }
    
//     res.status(201).json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getIncomingRequests = async (req, res) => {
//   try {
//     const company = await Company.findOne({ userId: req.user._id });
//     if (!company) return res.status(404).json({ message: 'Company not found' });
    
//     const requests = await JoinRequest.find({ toCompanyId: company._id })
//       .populate('fromUserId', 'name email mobile role')
//       .sort({ requestedAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getSentRequests = async (req, res) => {
//   try {
//     const requests = await JoinRequest.find({ fromUserId: req.user._id })
//       .populate('toCompanyId', 'companyName city email')
//       .sort({ requestedAt: -1 });
//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.respondToRequest = async (req, res) => {
//   try {
//     const { status, responseNote } = req.body;
//     const request = await JoinRequest.findByIdAndUpdate(req.params.id, { status, responseNote, respondedAt: new Date() }, { new: true });
//     if (!request) return res.status(404).json({ message: 'Request not found' });

//     if (status === 'approved') {
//       const company = await Company.findOne({ userId: req.user._id });
//       if (request.fromRole === 'connector') {
//         await Connector.findOneAndUpdate({ userId: request.fromUserId }, { $push: { companyRelations: { companyId: company._id, status: 'approved', joinedAt: new Date() } } });
//         await Company.findByIdAndUpdate(company._id, { $push: { connectorRelations: { connectorId: request.fromUserId, status: 'approved', joinedAt: new Date() } } });
//       } else if (request.fromRole === 'bank') {
//         const bank = await Bank.findOneAndUpdate({ userId: request.fromUserId }, { $push: { companyRelations: { companyId: company._id, status: 'approved', joinedAt: new Date() } } }, { new: true });
//         await Company.findByIdAndUpdate(company._id, { $push: { bankingRelations: { bankId: bank._id, status: 'approved', joinedAt: new Date() } } });
//       }
//     }

//     await sendNotification(request.fromUserId, 'Join Request Update', `Your join request has been ${status}`, 'join_request', request._id);
//     res.json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // NOTIFICATIONS
// exports.getNotifications = async (req, res) => {
//   try {
//     const { page = 1, limit = 20, type, isRead } = req.query;
//     const query = { userId: req.user._id };
//     if (type) query.type = type;
//     if (isRead !== undefined) query.isRead = isRead === 'true';
//     const notifications = await Notification.find(query).sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit));
//     const total = await Notification.countDocuments(query);
//     const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
//     res.json({ notifications, total, unreadCount, pages: Math.ceil(total/Number(limit)) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.markRead = async (req, res) => {
//   try {
//     await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
//     res.json({ message: 'Marked as read' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.markAllRead = async (req, res) => {
//   try {
//     await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
//     res.json({ message: 'All marked as read' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // MESSAGES
// exports.getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find({ $or: [{ toUserId: req.user._id }, { fromUserId: req.user._id }] })
//       .populate('fromUserId', 'name role')
//       .populate('toUserId', 'name role')
//       .sort({ createdAt: -1 });
//     res.json(messages);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.sendMessage = async (req, res) => {
//   try {
//     const { toUserId, subject, body, broadcastRole } = req.body;
//     const msg = await Message.create({ fromUserId: req.user._id, toUserId: toUserId || undefined, subject, body, broadcastRole: broadcastRole || undefined });
//     if (toUserId) {
//       await sendNotification(toUserId, 'New Message', `${req.user.name}: ${subject}`, 'message', msg._id);
//     } else if (broadcastRole) {
//       const users = await User.find({ role: broadcastRole, status: 'active' });
//       for (const u of users) {
//         await sendNotification(u._id, 'Broadcast Message', `${req.user.name}: ${subject}`, 'message', msg._id);
//       }
//     }
//     res.status(201).json(msg);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.replyMessage = async (req, res) => {
//   try {
//     const { body } = req.body;
//     const msg = await Message.findByIdAndUpdate(req.params.id, {
//       $push: { thread: { from: req.user._id, fromName: req.user.name, body, sentAt: new Date() } }
//     }, { new: true });
//     res.json(msg);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DASHBOARD (role-aware)
// exports.getDashboard = async (req, res) => {
//   try {
//     const { role, _id } = req.user;
//     let stats = {};

//     if (role === 'connector') {
//       const connector = await Connector.findOne({ userId: _id });
//       if (connector) {
//         const apps = await LoanApplication.find({ connectorId: connector._id });
//         const commissions = await Commission.find({ connectorId: connector._id });
//         const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
//         stats = {
//           totalApplications: apps.length,
//           pendingApplications: apps.filter(a => a.overallStatus === 'active').length,
//           approvedApplications: apps.filter(a => a.bankAssignments?.some(ba => ba.status === 'sanctioned')).length,
//           totalCommission: commissions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0),
//           monthCommission: commissions.filter(c => c.createdAt >= monthStart).reduce((sum, c) => sum + (c.commissionAmount || 0), 0),
//           loanTypeBreakdown: apps.reduce((acc, a) => { acc[a.loanType] = (acc[a.loanType] || 0) + 1; return acc; }, {}),
//           connectedCompanies: connector.companyRelations?.filter(r => r.status === 'approved').length || 0
//         };
//       }
//     } else if (role === 'company') {
//       const company = await Company.findOne({ userId: _id });
//       if (company) {
//         const apps = await LoanApplication.find({ companyId: company._id });
//         const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
//         stats = {
//           totalConnectors: company.connectorRelations?.filter(r => r.status === 'approved').length || 0,
//           totalBanks: company.bankingRelations?.filter(r => r.status === 'approved').length || 0,
//           totalApplications: apps.length,
//           monthApplications: apps.filter(a => a.createdAt >= monthStart).length,
//           pendingRequests: await JoinRequest.countDocuments({ toCompanyId: company._id, status: 'pending' })
//         };
//       }
//     } else if (role === 'bank') {
//       const bank = await Bank.findOne({ userId: _id });
//       if (bank) {
//         const apps = await LoanApplication.find({ 'bankAssignments.bankId': bank._id });
//         const allAssignments = apps.flatMap(a => a.bankAssignments.filter(ba => ba.bankId?.toString() === bank._id.toString()));
//         stats = {
//           totalLeads: allAssignments.length,
//           accepted: allAssignments.filter(ba => ['accepted','login','verification','credit_review','sanctioned','disbursement'].includes(ba.status)).length,
//           sanctioned: allAssignments.filter(ba => ba.status === 'sanctioned').length,
//           disbursed: allAssignments.filter(ba => ba.status === 'disbursement').length,
//           rejected: allAssignments.filter(ba => ba.status === 'rejected').length,
//           pendingQueries: allAssignments.flatMap(ba => ba.queries || []).filter(q => q.status === 'pending').length
//         };
//       }
//     }

//     res.json(stats);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // COMMISSIONS
// exports.getCommissions = async (req, res) => {
//   try {
//     const { role, _id } = req.user;
//     let query = {};
//     if (role === 'connector') {
//       const connector = await Connector.findOne({ userId: _id });
//       if (connector) query.connectorId = connector._id;
//     }
//     const commissions = await Commission.find(query).populate('applicationId', 'applicationId loanType loanAmount').sort({ createdAt: -1 });
//     const total = commissions.reduce((sum, c) => sum + (c.commissionAmount || 0), 0);
//     res.json({ commissions, total });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // COMPANIES LIST (for connectors/banks to browse)
// exports.getAllCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find({ status: 'active' }).populate('userId', 'name email');
//     res.json(companies);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllBanks = async (req, res) => {
//   try {
//     const { loanType } = req.query;
//     const query = { status: 'active' };
//     if (loanType) query.supportedLoanTypes = loanType;
//     const banks = await Bank.find(query);
//     res.json(banks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // exports.createCompanyConnector = async (req, res) => {
// //   try {
// //     const { name, email, mobile, password } = req.body;

// //     // Validation
// //     if (!name || !email) {
// //       return res.status(400).json({ message: 'Name and email are required' });
// //     }

// //     // Check duplicate email
// //     const existing = await User.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ message: 'Email already registered' });
// //     }

// //     // Get the company linked to the logged-in user
// //     const company = await Company.findOne({ userId: req.user._id });
// //     console.log('USER ID:', req.user._id);
// // console.log('COMPANY FOUND:', company);
// //     if (!company) {
// //       return res.status(404).json({ message: 'Company not found' });
// //     }

// //     // Create login credentials for connector
// //     const user = await User.create({
// //       role: 'connector',
// //       name,
// //       email,
// //       mobile,
// //       password: password || 'Connector@123',
// //       status: 'active',
// //     });

// //     // Create connector record linked to company
// //     const connector = await Connector.create({
// //       userId: user._id,
// //       companyId: company._id,
// //       name,
// //       email,
// //       mobile,
// //       status: 'active',
// //     });

// //     await AuditLog.create({
// //       userId: req.user._id,
// //       role: 'company',
// //       action: 'CREATE_CONNECTOR',
// //       targetId: connector._id,
// //       targetType: 'Connector',
// //       description: `Created connector: ${name}`,
// //     });

// //     res.status(201).json({ connector, message: 'Connector created successfully' });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };




// //shree


// exports.createCompanyConnector = async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;

//     if (!name || !email) {
//       return res.status(400).json({ message: 'Name and email are required' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Try to find company — fall back to user._id if not found
//     const company = await Company.findOne({ 
//       $or: [
//         { userId: req.user._id },
//         { _id: req.user.companyId },
//         { email: req.user.email },
//       ]
//     });

//     const companyId = company?._id || req.user.companyId || req.user._id;

//     console.log('req.user:', req.user._id, '| company:', companyId); // ← temp debug

//     const newUser = await User.create({
//       role: 'connector',
//       name, email,
//       mobile: mobile || '',
//       password: password || 'Connector@123',
//       status: 'active',
//       companyId,
//     });

//   const connector = await Connector.create({
//   userId: newUser._id,
//   name, email,
//   mobile: mobile || '',
//   status: 'active',
//   companyRelations: [{                    // ← use array, not companyId field
//     companyId,
//     status: 'approved',
//     joinedAt: new Date(),
//   }],
// });

//     res.status(201).json({ connector, message: 'Connector created successfully' });

//   } catch (err) {
//     console.error('createCompanyConnector ERROR:', err.message);
//     res.status(500).json({ message: err.message });
//   }
// };


// // exports.createCompanyBank = async (req, res) => {
// //   try {
// //     const { bankName, dsaCode, supportedLoanTypes, email, mobile, city, loginEmail, loginPassword } = req.body;

// //     if (!bankName) return res.status(400).json({ message: 'Bank name is required' });

// //     let userId;
// //     if (loginEmail && loginPassword) {
// //       const existing = await User.findOne({ email: loginEmail });
// //       if (existing) return res.status(400).json({ message: 'Login email already registered' });

// //       const user = await User.create({
// //         role: 'bank',
// //         name: bankName,
// //         email: loginEmail,
// //         password: loginPassword,
// //         status: 'active',
// //       });
// //       userId = user._id;
// //     }

// //     const bank = await Bank.create({
// //       userId, bankName, dsaCode, supportedLoanTypes,
// //       email, mobile, city, status: 'active',
// //     });

// //     await AuditLog.create({
// //       userId: req.user._id,
// //       role: 'company',
// //       action: 'CREATE_BANK',
// //       targetId: bank._id,
// //       targetType: 'Bank',
// //       description: `Company created bank: ${bankName}`,
// //     });

// //     res.status(201).json(bank);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // BANK - SM MANAGEMENT


// //shree

// exports.createCompanyBank = async (req, res) => {
//   try {
//     const { bankName, dsaCode, supportedLoanTypes, email, mobile, city, loginEmail, loginPassword } = req.body;

//     if (!bankName) return res.status(400).json({ message: 'Bank name is required' });

//     let userId;
//     if (loginEmail && loginPassword) {
//       const existing = await User.findOne({ email: loginEmail });
//       if (existing) {
//         userId = existing._id;  // reuse existing user
//       } else {
//         const user = await User.create({
//           role: 'bank',
//           name: bankName,
//           email: loginEmail,
//           password: loginPassword,
//           status: 'active',
//         });
//         userId = user._id;
//       }
//     }

//     // ← removed duplicate bank name check — same bank can have multiple DSA codes

//     const bank = await Bank.create({
//       userId,
//       bankName,
//       dsaCode: dsaCode || '',
//       supportedLoanTypes: supportedLoanTypes || [],
//       email: email || '',
//       mobile: mobile || '',
//       city: city || '',
//       status: 'active',
//     });

//     res.status(201).json(bank);
//   } catch (err) {
//     console.error('createCompanyBank error:', err.message);
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.createSM = async (req, res) => {
//   try {
//     const bank = await Bank.findOne({ userId: req.user._id });
//     if (!bank) return res.status(404).json({ message: 'Bank not found' });

//     const { name, email, mobile, employeeId, assignedLoanTypes, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already exists' });

//     const smUser = await User.create({ role: 'sm', name, email, mobile, password: password || 'SM@123' });
//     bank.salesManagers.push({ smId: smUser._id, name, email, employeeId, assignedLoanTypes, status: 'active' });
//     await bank.save();

//     res.status(201).json({ user: smUser.toJSON(), bank });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getSMs = async (req, res) => {
//   try {
//     const bank = await Bank.findOne({ userId: req.user._id });
//     if (!bank) return res.status(404).json({ message: 'Bank not found' });
//     res.json(bank.salesManagers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // COMPANY — connectors under them
// // exports.getCompanyConnectors = async (req, res) => {
// //   try {
// //     const connectors = await connectors.findOne({ userId: req.user._id });
// //     if (!company) return res.status(404).json({ message: 'Company not found' });
// //     const connectorIds = company.connectorRelations.filter(r => r.status === 'approved').map(r => r.connectorId);
// //     const connectors = await Connector.find({ _id: { $in: connectorIds } }).populate('userId', 'name email mobile');
// //     res.json(connectors);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// //shree

// // mainController.js

// exports.getCompanyConnectors = async (req, res) => {
//   try {
//     // Find the company for this logged-in user
//     const company = await Company.findOne({
//       $or: [
//         { userId: req.user._id },
//         { _id: req.user.companyId },
//         { email: req.user.email },
//       ]
//     });

//     const companyId = company?._id || req.user.companyId;

//     if (!companyId) {
//       return res.status(404).json({ message: 'Company not found' });
//     }

//     // Query using companyRelations array
//     const connectors = await Connector.find({
//       'companyRelations.companyId': companyId,   // ← this is the key fix
//     }).populate('userId', 'name email mobile');

//     res.json(connectors);
//   } catch (err) {
//     console.error('getCompanyConnectors error:', err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getCompanyBanks = async (req, res) => {
//   try {
//     const company = await Company.findOne({ userId: req.user._id });
//     if (!company) return res.status(404).json({ message: 'Company not found' });
//     const bankIds = company.bankingRelations.filter(r => r.status === 'approved').map(r => r.bankId);
//     const banks = await Bank.find({ _id: { $in: bankIds } });
//     res.json(banks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };











const Company = require('../models/Company');
const Bank = require('../models/Bank');
const Connector = require('../models/Connector');
const User = require('../models/User');
const LoanApplication = require('../models/LoanApplication');
const { JoinRequest, Notification, Message, Commission, AuditLog } = require('../models/index');
const { sendNotification } = require('../utils/notifications');

// JOIN REQUESTS
exports.sendJoinRequest = async (req, res) => {
  try {
    const { companyId } = req.body;
    const fromRole = req.user.role;
    if (!['connector', 'bank'].includes(fromRole)) return res.status(400).json({ message: 'Only connectors and banks can send join requests' });

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
    const notifications = await Notification.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ userId: req.user._id, isRead: false });
    res.json({ notifications, total, unreadCount, pages: Math.ceil(total / Number(limit)) });
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
    const msg = await Message.create({ fromUserId: req.user._id, toUserId: toUserId || undefined, subject, body, broadcastRole: broadcastRole || undefined });
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
// CHANGED: Corporate DSA (company) dashboard now includes ALL required monitoring metrics
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
          connectedCompanies: connector.companyRelations?.filter(r => r.status === 'approved').length || 0,
          // Bank responses on my leads
          bankResponses: {
            interested: apps.flatMap(a => a.bankAssignments).filter(ba => ba.interestStatus === 'interested').length,
            notInterested: apps.flatMap(a => a.bankAssignments).filter(ba => ba.interestStatus === 'not_interested').length,
            needMoreInfo: apps.flatMap(a => a.bankAssignments).filter(ba => ba.interestStatus === 'need_more_info').length,
            pending: apps.flatMap(a => a.bankAssignments).filter(ba => ba.interestStatus === 'pending').length,
          },
          selectedBanks: apps.filter(a => a.selectedBankId).length,
        };
      }
    } else if (role === 'company') {
      // CHANGED: Full Corporate DSA monitoring dashboard
      const company = await Company.findOne({ userId: _id });
      if (company) {
        const apps = await LoanApplication.find({ companyId: company._id })
          .populate('connectorId', 'name email');
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const allAssignments = apps.flatMap(a => a.bankAssignments);

        // Total leads created
        const totalLeads = apps.length;
        const monthLeads = apps.filter(a => new Date(a.createdAt) >= monthStart).length;

        // Bank response breakdown
        const bankResponseStatus = {
          interested: allAssignments.filter(ba => ba.interestStatus === 'interested').length,
          notInterested: allAssignments.filter(ba => ba.interestStatus === 'not_interested').length,
          needMoreInfo: allAssignments.filter(ba => ba.interestStatus === 'need_more_info').length,
          pending: allAssignments.filter(ba => ba.interestStatus === 'pending').length,
        };

        // Banks selected by connectors
        const banksSelected = apps.filter(a => a.selectedBankId).length;

        // Document download logs
        const documentDownloadLogs = allAssignments.flatMap(ba =>
          (ba.documentDownloads || []).map(d => ({
            bankName: ba.bankName,
            downloadedBy: d.downloadedBy,
            fileName: d.fileName,
            downloadedAt: d.downloadedAt
          }))
        );

        // Email sent logs
        const emailSentLogs = allAssignments.filter(ba => ba.emailSentAt).map(ba => ({
          bankName: ba.bankName,
          emailSentAt: ba.emailSentAt
        }));

        // Mask/Unmask history
        const maskUnmaskHistory = apps.flatMap(a =>
          (a.maskHistory || []).map(h => ({
            applicationId: a.applicationId,
            ...h
          }))
        );

        // Lead source breakdown (by connector)
        const leadSourceBreakdown = apps.reduce((acc, a) => {
          const name = a.connectorId?.name || 'Unknown';
          acc[name] = (acc[name] || 0) + 1;
          return acc;
        }, {});

        // Loan processing status (for selected bank per lead)
        const processingStatusBreakdown = apps.reduce((acc, a) => {
          if (a.selectedBankId) {
            const selAssignment = a.bankAssignments.find(ba => ba.bankId?.toString() === a.selectedBankId?.toString());
            if (selAssignment) {
              acc[selAssignment.status] = (acc[selAssignment.status] || 0) + 1;
            }
          }
          return acc;
        }, {});

        // Recent audit logs for this company's activity
        const recentAuditLogs = await AuditLog.find({
          targetId: { $in: apps.map(a => a._id) }
        }).sort({ createdAt: -1 }).limit(50).populate('userId', 'name role');

        stats = {
          // Overview
          totalLeads,
          monthLeads,
          totalConnectors: company.connectorRelations?.filter(r => r.status === 'approved').length || 0,
          totalBanks: company.bankingRelations?.filter(r => r.status === 'approved').length || 0,
          pendingRequests: await JoinRequest.countDocuments({ toCompanyId: company._id, status: 'pending' }),

          // Workflow monitoring
          leadSourceBreakdown,
          bankResponseStatus,
          banksSelectedByConnectors: banksSelected,
          processingStatusBreakdown,

          // Audit trails
          maskUnmaskHistory,
          documentDownloadLogs,
          emailSentLogs,
          recentActivityLog: recentAuditLogs,

          // Loan type breakdown
          loanTypeBreakdown: apps.reduce((acc, a) => { acc[a.loanType] = (acc[a.loanType] || 0) + 1; return acc; }, {}),
        };
      }
    } else if (role === 'bank') {
      const bank = await Bank.findOne({ userId: _id });
      if (bank) {
        const apps = await LoanApplication.find({ 'bankAssignments.bankId': bank._id });
        const allAssignments = apps.flatMap(a => a.bankAssignments.filter(ba => ba.bankId?.toString() === bank._id.toString()));
        stats = {
          totalLeads: allAssignments.length,
          // Interest status breakdown
          interested: allAssignments.filter(ba => ba.interestStatus === 'interested').length,
          notInterested: allAssignments.filter(ba => ba.interestStatus === 'not_interested').length,
          needMoreInfo: allAssignments.filter(ba => ba.interestStatus === 'need_more_info').length,
          // Processing stats (only for leads where this bank was selected)
          selectedByConnector: apps.filter(a => a.selectedBankId?.toString() === bank._id.toString()).length,
          accepted: allAssignments.filter(ba => ['accepted', 'login', 'verification', 'credit_review', 'sanctioned', 'disbursement'].includes(ba.status)).length,
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

// COMPANIES LIST
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

exports.createCompanyConnector = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const company = await Company.findOne({
      $or: [
        { userId: req.user._id },
        { _id: req.user.companyId },
        { email: req.user.email },
      ]
    });

    const companyId = company?._id || req.user.companyId || req.user._id;

    const newUser = await User.create({
      role: 'connector',
      name, email,
      mobile: mobile || '',
      password: password || 'Connector@123',
      status: 'active',
      companyId,
    });

    const connector = await Connector.create({
      userId: newUser._id,
      name, email,
      mobile: mobile || '',
      status: 'active',
      companyRelations: [{ companyId, status: 'approved', joinedAt: new Date() }],
    });

    res.status(201).json({ connector, message: 'Connector created successfully' });
  } catch (err) {
    console.error('createCompanyConnector ERROR:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// exports.createCompanyBank = async (req, res) => {
//   try {
//     const { bankName, dsaCode, supportedLoanTypes, email, mobile, city, loginEmail, loginPassword } = req.body;

//     if (!bankName) return res.status(400).json({ message: 'Bank name is required' });

//     let userId;
//     if (loginEmail && loginPassword) {
//       const existing = await User.findOne({ email: loginEmail });
//       if (existing) {
//         userId = existing._id;
//       } else {
//         const user = await User.create({
//           role: 'bank',
//           name: bankName,
//           email: loginEmail,
//           password: loginPassword,
//           status: 'active',
//         });
//         userId = user._id;
//       }
//     }

//     const bank = await Bank.create({
//       userId,
//       bankName,
//       dsaCode: dsaCode || '',
//       supportedLoanTypes: supportedLoanTypes || [],
//       email: email || '',
//       mobile: mobile || '',
//       city: city || '',
//       status: 'active',
//     });

//     res.status(201).json(bank);
//   } catch (err) {
//     console.error('createCompanyBank error:', err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// BANK - SM MANAGEMENT

exports.createCompanyBank = async (req, res) => {
  try {
    const { bankName, dsaCode, supportedLoanTypes, email, mobile, city, loginEmail, loginPassword } = req.body;

    if (!bankName) return res.status(400).json({ message: 'Bank name is required' });

    // Find the company of logged-in user
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    let userId;
    if (loginEmail && loginPassword) {
      const existing = await User.findOne({ email: loginEmail });
      if (existing) {
        userId = existing._id;
      } else {
        const user = await User.create({
          role: 'bank', name: bankName,
          email: loginEmail, password: loginPassword, status: 'active',
        });
        userId = user._id;
      }
    }

    // Create bank WITH companyRelations linked
    const bank = await Bank.create({
      userId,
      bankName,
      dsaCode: dsaCode || '',
      supportedLoanTypes: supportedLoanTypes || [],
      email: email || '',
      mobile: mobile || '',
      city: city || '',
      status: 'active',
      companyRelations: [{ companyId: company._id, status: 'approved', joinedAt: new Date() }], // ← ADD THIS
    });

    // Also link bank in Company's bankingRelations
    await Company.findByIdAndUpdate(company._id, {
      $push: { bankingRelations: { bankId: bank._id, status: 'approved', joinedAt: new Date() } }
    });

    res.status(201).json(bank);
  } catch (err) {
    console.error('createCompanyBank error:', err.message);
    res.status(500).json({ message: err.message });
  }
};
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

exports.getCompanyConnectors = async (req, res) => {
  try {
    const company = await Company.findOne({
      $or: [
        { userId: req.user._id },
        { _id: req.user.companyId },
        { email: req.user.email },
      ]
    });

    const companyId = company?._id || req.user.companyId;

    if (!companyId) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const connectors = await Connector.find({
      'companyRelations.companyId': companyId,
    }).populate('userId', 'name email mobile');

    res.json(connectors);
  } catch (err) {
    console.error('getCompanyConnectors error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// exports.getCompanyBanks = async (req, res) => {             


//   try {
//     const company = await Company.findOne({ userId: req.user._id });
//     if (!company) return res.status(404).json({ message: 'Company not found' });
//     const bankIds = company.bankingRelations.filter(r => r.status === 'approved').map(r => r.bankId);
//     const banks = await Bank.find({ _id: { $in: bankIds } });
//     res.json(banks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


exports.getCompanyBanks = async (req, res) => {
  try {
    const company = await Company.findOne({ userId: req.user._id });
    if (!company) return res.status(404).json({ message: 'Company not found' });

    // Query banks directly using companyRelations (same pattern as connectors)
    const banks = await Bank.find({
      'companyRelations.companyId': company._id
    });

    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};