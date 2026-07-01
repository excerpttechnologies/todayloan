// const User = require('../models/User');
// const Company = require('../models/Company');
// const Bank = require('../models/Bank');
// const Connector = require('../models/Connector');
// const LoanApplication = require('../models/LoanApplication');
// const { AuditLog, Commission } = require('../models/index');
// const XLSX = require('xlsx');
// const PDFDocument = require('pdfkit');

// exports.getDashboardStats = async (req, res) => {
//   try {
//     const [totalBanks, totalCompanies, totalConnectors, totalApplications] = await Promise.all([
//       Bank.countDocuments(),
//       Company.countDocuments(),
//       Connector.countDocuments(),
//       LoanApplication.countDocuments()
//     ]);

//     const today = new Date(); today.setHours(0,0,0,0);
//     const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//     const [todayApps, monthApps] = await Promise.all([
//       LoanApplication.countDocuments({ createdAt: { $gte: today } }),
//       LoanApplication.countDocuments({ createdAt: { $gte: thisMonth } })
//     ]);

//     const disbursedAgg = await LoanApplication.aggregate([
//       { $unwind: '$bankAssignments' },
//       { $match: { 'bankAssignments.status': 'disbursement' } },
//       { $group: { _id: null, total: { $sum: '$bankAssignments.disbursementAmount' } } }
//     ]);

//     const loanTypeStats = await LoanApplication.aggregate([
//       { $group: { _id: '$loanType', count: { $sum: 1 } } }
//     ]);

//     const monthlyStats = await LoanApplication.aggregate([
//       { $match: { createdAt: { $gte: new Date(Date.now() - 365*24*60*60*1000) } } },
//       { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
//       { $sort: { '_id.year': 1, '_id.month': 1 } }
//     ]);

//     res.json({
//       totalBanks, totalCompanies, totalConnectors, totalApplications,
//       todayApplications: todayApps,
//       monthApplications: monthApps,
//       totalDisbursed: disbursedAgg[0]?.total || 0,
//       loanTypeStats,
//       monthlyStats
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.getBanks = async (req, res) => {
// //   try {
// //     const { search, status, page = 1, limit = 20 } = req.query;
// //     const query = {};
// //     if (search) query.$or = [{ bankName: /search/i }, { dsaCode: /search/i }];
// //     if (status) query.status = status;
// //     const banks = await Bank.find(query).populate('userId', 'name email').skip((page-1)*limit).limit(Number(limit));
// //     const total = await Bank.countDocuments(query);
// //     res.json({ banks, total, pages: Math.ceil(total/limit) });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// //shree

// exports.getBanks = async (req, res) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const limit = Math.max(1, parseInt(req.query.limit) || 10);
//     const { search, status } = req.query;

//     const query = {};
//     if (search) query.$or = [
//       { bankName: { $regex: search, $options: 'i' } },   // ← was /search/i (literal string bug)
//       { dsaCode:  { $regex: search, $options: 'i' } },
//     ];
//     if (status) query.status = status;

//     const [banks, total] = await Promise.all([
//       Bank.find(query)
//         .populate('userId', 'name email')
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit),
//       Bank.countDocuments(query),
//     ]);

//     res.json({ banks, total, pages: Math.ceil(total / limit), page, limit });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createBank = async (req, res) => {
//   try {
//     const { bankName, dsaCode, supportedLoanTypes, address, city, pincode, email, mobile, password } = req.body;
//     let userId;
//     if (email && password) {
//       const existing = await User.findOne({ email });
//       if (existing) return res.status(400).json({ message: 'Email already registered' });
//       const user = await User.create({ role: 'bank', name: bankName, email, mobile, password });
//       userId = user._id;
//     }
//     const bank = await Bank.create({ userId, bankName, dsaCode, supportedLoanTypes, address, city, pincode, email, mobile, status: 'active' });
//     await AuditLog.create({ userId: req.user._id, role: 'admin', action: 'CREATE_BANK', targetId: bank._id, targetType: 'Bank', description: `Created bank: ${bankName}` });
//     res.status(201).json(bank);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateBank = async (req, res) => {
//   try {
//     const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(bank);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteBank = async (req, res) => {
//   try {
//     await Bank.findByIdAndUpdate(req.params.id, { status: 'inactive' });
//     res.json({ message: 'Bank deactivated' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getCompanies = async (req, res) => {
//   try {
//     const { search, status, page = 1, limit = 20 } = req.query;
//     const query = {};
//     if (status) query.status = status;
//     const companies = await Company.find(query).populate('userId', 'name email').skip((page-1)*limit).limit(Number(limit));
//     const total = await Company.countDocuments(query);
//     res.json({ companies, total, pages: Math.ceil(total/limit) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createCompany = async (req, res) => {
//   try {
//     //const { companyName, email, mobile, password, registrationNumber, gstNumber, address, city, pincode } = req.body;
//     //raksha
//     const { companyName, email, mobile, password, registrationNumber, gstNumber, address, city, pincode, branches, documents } = req.body;
//     let userId;
//     if (email && password) {
//       const existing = await User.findOne({ email });
//       if (existing) return res.status(400).json({ message: 'Email already registered' });
//       const user = await User.create({ role: 'company', name: companyName, email, mobile, password });
//       userId = user._id;
//     }
//     //const company = await Company.create({ userId, companyName, registrationNumber, gstNumber, address, city, pincode, email, mobile });
//     //raksha
//    const company = await Company.create({ userId, companyName, registrationNumber, gstNumber, address, city, pincode, email, mobile, branches: branches || [], documents: documents || [] });
//     res.status(201).json(company);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateCompany = async (req, res) => {
//   try {
//     const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(company);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getConnectors = async (req, res) => {
//   try {
//     const { page = 1, limit = 20, status } = req.query;
//     const query = status ? { status } : {};
//     const connectors = await Connector.find(query).populate('userId', 'name email mobile').skip((page-1)*limit).limit(Number(limit));
//     const total = await Connector.countDocuments(query);
//     res.json({ connectors, total, pages: Math.ceil(total/limit) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.createConnector = async (req, res) => {
// //   try {
// //     const { name, email, mobile, password } = req.body;
// //     const existing = await User.findOne({ email });
// //     if (existing) return res.status(400).json({ message: 'Email already registered' });
// //     const user = await User.create({ role: 'connector', name, email, mobile, password: password || 'Connector@123' });
// //     const connector = await Connector.create({ userId: user._id, name, mobile, email });
// //     res.status(201).json(connector);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// // controllers/company.controller.js

// //shree


// exports.createConnector = async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;
//     const companyId = req.user.companyId; // or req.user._id depending on your auth

//     // Check email not already used
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already registered' });

//     // Create login user for connector
//     const user = await User.create({
//       role: 'connector',
//       name,
//       email,
//       mobile,
//       password,
//       companyId,
//     });

//     // Create connector record linked to this company
//     // const connector = await Connector.create({
//     //   userId: user._id,
//     //   companyId,
//     //   name,
//     //   email,
//     //   mobile,
//     //   status: 'active',
//     // });

//     //shree

// const connector = await Connector.create({
//   userId: newUser._id,
//   companyRelations: [{ companyId }],   // ← use companyRelations array
//   name, email,
//   mobile: mobile || '',
//   status: 'active',
// });


//     await AuditLog.create({
//       userId: req.user._id,
//       role: 'company',
//       action: 'CREATE_CONNECTOR',
//       targetId: connector._id,
//       targetType: 'Connector',
//       description: `Created connector: ${name}`,
//     });

//     res.status(201).json(connector);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getConnectors = async (req, res) => {
//   try {
//     const companyId = req.user.companyId;
//     const connectors = await Connector.find({ companyId })
//       .populate('userId', 'name email mobile')
//       .sort({ createdAt: -1 });
//     res.json({ connectors, total: connectors.length });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAllApplications = async (req, res) => {
//   try {
//     const { loanType, status, connectorId, companyId, startDate, endDate, page = 1, limit = 20 } = req.query;
//     const query = {};
//     if (loanType) query.loanType = loanType;
      
//     if (status)       query.overallStatus = status;
//     if (connectorId) query.connectorId = connectorId;
//     if (companyId) query.companyId = companyId;
//     if (startDate || endDate) {
//       query.createdAt = {};
//       if (startDate) query.createdAt.$gte = new Date(startDate);
//       if (endDate) query.createdAt.$lte = new Date(endDate);
//     }

// const pageNum  = Math.max(1, Number(page));
//     const limitNum = Math.min(100, Math.max(1, Number(limit)));

//     const [apps, total] = await Promise.all([
//       LoanApplication.find(query)
//         .populate('connectorId', 'name email')
//         .populate('companyId', 'companyName')
//         .sort({ createdAt: -1 })
//         .skip((pageNum - 1) * limitNum)
//         .limit(limitNum),
//       LoanApplication.countDocuments(query),
//     ]);
//     res.json({ applications: apps, total, pages: Math.ceil(total/limitNum),page: pageNum,
//       limit: limitNum, });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getUsers = async (req, res) => {
//   try {
//     const { role, status, page = 1, limit = 20 } = req.query;
//     const query = {};
//     if (role) query.role = role;
//     if (status) query.status = status;
//     const users = await User.find(query).select('-password -refreshToken').skip((page-1)*limit).limit(Number(limit));
//     const total = await User.countDocuments(query);
//     res.json({ users, total, pages: Math.ceil(total/limit) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.updateUserStatus = async (req, res) => {
// //   try {
// //     const { status } = req.body;
// //     await User.findByIdAndUpdate(req.params.id, { status });
// //     res.json({ message: 'User status updated' });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };



// //shree

// exports.updateUserStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     // Update user
//     await User.findByIdAndUpdate(req.params.id, { status });
//     // Also update connector/bank status
//     await Connector.findOneAndUpdate({ userId: req.params.id }, { status });
//     await Bank.findOneAndUpdate({ userId: req.params.id }, { status });
//     res.json({ message: 'User status updated' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // exports.getAuditLogs = async (req, res) => {
// //   try {
// //     const { page = 1, limit = 50 } = req.query;
// //     const logs = await AuditLog.find().populate('userId', 'name role').sort({ createdAt: -1 }).skip((page-1)*limit).limit(Number(limit));
// //     const total = await AuditLog.countDocuments();
// //     res.json({ logs, total, pages: Math.ceil(total/limit) });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// //SHREE

// exports.getAuditLogs = async (req, res) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
//     const skip = (page - 1) * limit;

//     const [logs, total] = await Promise.all([
//       AuditLog.find()
//         .populate('userId', 'name role')
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit),
//       AuditLog.countDocuments(),
//     ]);

//     const pages = Math.ceil(total / limit);

//     res.json({ logs, total, pages, page, limit });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getReports = async (req, res) => {
//   try {
//     const { type, startDate, endDate } = req.query;
//     const dateFilter = {};
//     if (startDate) dateFilter.$gte = new Date(startDate);
//     if (endDate) dateFilter.$lte = new Date(endDate);

//     let data = {};

//     if (type === 'bank-wise') {
//       data = await LoanApplication.aggregate([
//         { $unwind: '$bankAssignments' },
//         { $group: { _id: '$bankAssignments.bankName', total: { $sum: 1 }, accepted: { $sum: { $cond: [{ $eq: ['$bankAssignments.status','accepted'] }, 1, 0] } }, sanctioned: { $sum: { $cond: [{ $eq: ['$bankAssignments.status','sanctioned'] }, 1, 0] } } } }
//       ]);
//     } else if (type === 'connector-wise') {
//       data = await LoanApplication.aggregate([
//         { $group: { _id: '$connectorId', total: { $sum: 1 } } },
//         { $lookup: { from: 'connectors', localField: '_id', foreignField: '_id', as: 'connector' } }
//       ]);
//     } else if (type === 'monthly') {
//       data = await LoanApplication.aggregate([
//         { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 }, amount: { $sum: '$loanAmount' } } },
//         { $sort: { '_id.year': 1, '_id.month': 1 } }
//       ]);
//     } else if (type === 'tat') {
//       data = await LoanApplication.find({ 'bankAssignments.tatBreached': true })
//         .populate('connectorId', 'name').populate('companyId', 'companyName');
//     } else {
//       data = await LoanApplication.find(Object.keys(dateFilter).length ? { createdAt: dateFilter } : {})
//         .populate('connectorId', 'name').populate('companyId', 'companyName')
//         .sort({ createdAt: -1 }).limit(500);
//     }

//     res.json({ type, data });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.exportExcel = async (req, res) => {
//   try {
//     const { entity } = req.params;
//     let data = [], headers = [];

//     if (entity === 'banks') {
//       const banks = await Bank.find();
//       headers = ['Bank Name','DSA Code','Supported Loans','City','Status'];
//       data = banks.map(b => [b.bankName, b.dsaCode, b.supportedLoanTypes?.join(', '), b.city, b.status]);
//     } else if (entity === 'companies') {
//       const companies = await Company.find();
//       headers = ['Company Name','Registration No','GST','City','Email','Status'];
//       data = companies.map(c => [c.companyName, c.registrationNumber, c.gstNumber, c.city, c.email, c.status]);
//     } else if (entity === 'connectors') {
//       const connectors = await Connector.find().populate('userId', 'email');
//       headers = ['Name','Mobile','Email','Total Leads','Status'];
//       data = connectors.map(c => [c.name, c.mobile, c.email, c.totalLeads, c.status]);
//     } else if (entity === 'applications') {
//       const apps = await LoanApplication.find().populate('connectorId','name').populate('companyId','companyName');
//       headers = ['App ID','Loan Type','Amount','Customer','Connector','Company','Status','Date'];
//       data = apps.map(a => [a.applicationId, a.loanType, a.loanAmount, a.applicantDetails?.name, a.connectorId?.name, a.companyId?.companyName, a.overallStatus, a.createdAt?.toLocaleDateString()]);
//     }

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
//     XLSX.utils.book_append_sheet(wb, ws, entity);
//     const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

//     res.setHeader('Content-Disposition', `attachment; filename=bankzone_${entity}_${Date.now()}.xlsx`);
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.send(buf);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.importExcel = async (req, res) => {
//   try {
//     const { entity } = req.params;
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    
//     const wb = XLSX.read(req.file.buffer || require('fs').readFileSync(req.file.path));
//     const ws = wb.Sheets[wb.SheetNames[0]];
//     const rows = XLSX.utils.sheet_to_json(ws);

//     let success = 0, failed = [], results = [];

//     for (const row of rows) {
//       try {
//         if (entity === 'connectors') {
//           const email = row['Email'] || row['email'];
//           const name = row['Name'] || row['name'];
//           if (!email || !name) { failed.push({ row, reason: 'Missing name or email' }); continue; }
//           const exists = await User.findOne({ email });
//           if (exists) { failed.push({ row, reason: 'Email already exists' }); continue; }
//           const user = await User.create({ role: 'connector', name, email, mobile: row['Mobile'] || '', password: 'Connector@123' });
//           await Connector.create({ userId: user._id, name, mobile: row['Mobile'] || '', email });
//           success++;
//         } else if (entity === 'companies') {
//           const email = row['Email'] || row['email'];
//           const companyName = row['Company Name'] || row['companyName'];
//           if (!email || !companyName) { failed.push({ row, reason: 'Missing company name or email' }); continue; }
//           const exists = await User.findOne({ email });
//           if (exists) { failed.push({ row, reason: 'Email already exists' }); continue; }
//           const user = await User.create({ role: 'company', name: companyName, email, password: 'Company@123' });
//           await Company.create({ userId: user._id, companyName, email, city: row['City'] });
//           success++;
//         }
//       } catch(e) { failed.push({ row, reason: e.message }); }
//     }

//     res.json({ success, failed: failed.length, failedRows: failed, message: `Imported ${success} records, ${failed.length} failed` });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getImportTemplate = async (req, res) => {
//   try {
//     const { entity } = req.params;
//     const wb = XLSX.utils.book_new();
//     let headers = [];
//     if (entity === 'connectors') headers = ['Name','Email','Mobile'];
//     else if (entity === 'companies') headers = ['Company Name','Email','Mobile','City','Registration No','GST'];
//     else if (entity === 'banks') headers = ['Bank Name','DSA Code','City','Email','Supported Loan Types (comma separated)'];
//     const ws = XLSX.utils.aoa_to_sheet([headers]);
//     XLSX.utils.book_append_sheet(wb, ws, 'Template');
//     const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
//     res.setHeader('Content-Disposition', `attachment; filename=bankzone_${entity}_template.xlsx`);
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.send(buf);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };










const User = require('../models/User');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const Connector = require('../models/Connector');
const LoanApplication = require('../models/LoanApplication');
const { AuditLog, Commission } = require('../models/index');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalBanks, totalCompanies, totalConnectors, totalApplications] = await Promise.all([
      Bank.countDocuments(),
      Company.countDocuments(),
      Connector.countDocuments(),
      LoanApplication.countDocuments()
    ]);

    const today = new Date(); today.setHours(0, 0, 0, 0);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [todayApps, monthApps] = await Promise.all([
      LoanApplication.countDocuments({ createdAt: { $gte: today } }),
      LoanApplication.countDocuments({ createdAt: { $gte: thisMonth } })
    ]);

    const disbursedAgg = await LoanApplication.aggregate([
      { $unwind: '$bankAssignments' },
      { $match: { 'bankAssignments.status': 'disbursement' } },
      { $group: { _id: null, total: { $sum: '$bankAssignments.disbursementAmount' } } }
    ]);

    const loanTypeStats = await LoanApplication.aggregate([
      { $group: { _id: '$loanType', count: { $sum: 1 } } }
    ]);

    const monthlyStats = await LoanApplication.aggregate([
      { $match: { createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } } },
      { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      totalBanks, totalCompanies, totalConnectors, totalApplications,
      todayApplications: todayApps,
      monthApplications: monthApps,
      totalDisbursed: disbursedAgg[0]?.total || 0,
      loanTypeStats,
      monthlyStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBanks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const { search, status } = req.query;

    const query = {};
    if (search) query.$or = [
      { bankName: { $regex: search, $options: 'i' } },
      { dsaCode: { $regex: search, $options: 'i' } },
    ];
    if (status) query.status = status;

    const [banks, total] = await Promise.all([
      Bank.find(query).populate('userId', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Bank.countDocuments(query),
    ]);

    res.json({ banks, total, pages: Math.ceil(total / limit), page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBank = async (req, res) => {
  try {
    const { bankName, dsaCode, supportedLoanTypes, address, city, pincode, email, mobile, password } = req.body;
    let userId;
    if (email && password) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already registered' });
      const user = await User.create({ role: 'bank', name: bankName, email, mobile, password });
      userId = user._id;
    }
    const bank = await Bank.create({ userId, bankName, dsaCode, supportedLoanTypes, address, city, pincode, email, mobile, status: 'active' });
    await AuditLog.create({ userId: req.user._id, role: 'admin', action: 'CREATE_BANK', targetId: bank._id, targetType: 'Bank', description: `Created bank: ${bankName}` });
    res.status(201).json(bank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBank = async (req, res) => {
  try {
    const bank = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bank);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBank = async (req, res) => {
  try {
    await Bank.findByIdAndUpdate(req.params.id, { status: 'inactive' });
    res.json({ message: 'Bank deactivated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;
    const companies = await Company.find(query).populate('userId', 'name email').skip((page - 1) * limit).limit(Number(limit));
    const total = await Company.countDocuments(query);
    res.json({ companies, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { companyName, email, mobile, password, registrationNumber, gstNumber, address, city, pincode, branches, documents } = req.body;
    let userId;
    if (email && password) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email already registered' });
      const user = await User.create({ role: 'company', name: companyName, email, mobile, password });
      userId = user._id;
    }
    const company = await Company.create({ userId, companyName, registrationNumber, gstNumber, address, city, pincode, email, mobile, branches: branches || [], documents: documents || [] });
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CHANGED: getConnectors with pagination (fixed duplicate definition)
exports.getConnectors = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const { status } = req.query;
    const query = status ? { status } : {};
    const [connectors, total] = await Promise.all([
      Connector.find(query).populate('userId', 'name email mobile').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Connector.countDocuments(query)
    ]);
    res.json({ connectors, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createConnector = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ role: 'connector', name, email, mobile, password: password || 'Connector@123' });
    const connector = await Connector.create({ userId: user._id, name, mobile: mobile || '', email });
    await AuditLog.create({ userId: req.user._id, role: 'admin', action: 'CREATE_CONNECTOR', targetId: connector._id, targetType: 'Connector', description: `Created connector: ${name}` });
    res.status(201).json(connector);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CHANGED: getAllApplications — enriched with full audit data for Corporate DSA monitoring
exports.getAllApplications = async (req, res) => {
  try {
    const { loanType, status, connectorId, companyId, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = {};
    if (loanType) query.loanType = loanType;
    if (status) query.overallStatus = status;
    if (connectorId) query.connectorId = connectorId;
    if (companyId) query.companyId = companyId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));

    const [apps, total] = await Promise.all([
      LoanApplication.find(query)
        .populate('connectorId', 'name email mobile')
        .populate('companyId', 'companyName')
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      LoanApplication.countDocuments(query),
    ]);

    // CHANGED: Map each application to include Corporate DSA monitoring fields
    const enriched = apps.map(app => {
      const obj = app.toObject();
      return {
        ...obj,
        // Dashboard monitoring fields
        leadSource: app.connectorId?.name || 'Unknown',
        banksSelected: app.bankAssignments?.map(ba => ba.bankName) || [],
        bankResponseStatus: app.bankAssignments?.map(ba => ({
          bankName: ba.bankName,
          interestStatus: ba.interestStatus,
          interestNote: ba.interestNote,
          interestUpdatedAt: ba.interestUpdatedAt,
          status: ba.status
        })) || [],
        approvedBank: app.selectedBankName || null,
        maskUnmaskHistory: app.maskHistory || [],
        documentDownloadHistory: app.bankAssignments?.flatMap(ba =>
          (ba.documentDownloads || []).map(d => ({
            bankName: ba.bankName,
            downloadedBy: d.downloadedBy,
            fileName: d.fileName,
            downloadedAt: d.downloadedAt
          }))
        ) || [],
        emailSentLogs: app.bankAssignments?.filter(ba => ba.emailSentAt).map(ba => ({
          bankName: ba.bankName,
          emailSentAt: ba.emailSentAt
        })) || [],
        processingStatus: app.bankAssignments?.find(ba =>
          ba.bankId?.toString() === app.selectedBankId?.toString()
        )?.status || null,
      };
    });

    res.json({ applications: enriched, total, pages: Math.ceil(total / limitNum), page: pageNum, limit: limitNum });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (role) query.role = role;
    if (status) query.status = status;
    const users = await User.find(query).select('-password -refreshToken').skip((page - 1) * limit).limit(Number(limit));
    const total = await User.countDocuments(query);
    res.json({ users, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await User.findByIdAndUpdate(req.params.id, { status });
    await Connector.findOneAndUpdate({ userId: req.params.id }, { status });
    await Bank.findOneAndUpdate({ userId: req.params.id }, { status });
    res.json({ message: 'User status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const skip = (page - 1) * limit;

    // CHANGED: Support filtering by action type and date range for Corporate DSA audit trail
    const { action, userId, startDate, endDate } = req.query;
    const query = {};
    if (action) query.action = action;
    if (userId) query.userId = userId;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(query).populate('userId', 'name role').sort({ createdAt: -1 }).skip(skip).limit(limit),
      AuditLog.countDocuments(query),
    ]);

    res.json({ logs, total, pages: Math.ceil(total / limit), page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CHANGED: getLoginActivityLogs — new endpoint for login audit trail monitoring
exports.getLoginActivityLogs = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const [logs, total] = await Promise.all([
      AuditLog.find({ action: 'LOGIN' }).populate('userId', 'name role email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      AuditLog.countDocuments({ action: 'LOGIN' })
    ]);
    res.json({ logs, total, pages: Math.ceil(total / limit), page, limit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    let data = {};

    if (type === 'bank-wise') {
      data = await LoanApplication.aggregate([
        { $unwind: '$bankAssignments' },
        { $group: { _id: '$bankAssignments.bankName', total: { $sum: 1 }, accepted: { $sum: { $cond: [{ $eq: ['$bankAssignments.status', 'accepted'] }, 1, 0] } }, sanctioned: { $sum: { $cond: [{ $eq: ['$bankAssignments.status', 'sanctioned'] }, 1, 0] } } } }
      ]);
    } else if (type === 'connector-wise') {
      data = await LoanApplication.aggregate([
        { $group: { _id: '$connectorId', total: { $sum: 1 } } },
        { $lookup: { from: 'connectors', localField: '_id', foreignField: '_id', as: 'connector' } }
      ]);
    } else if (type === 'monthly') {
      data = await LoanApplication.aggregate([
        { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 }, amount: { $sum: '$loanAmount' } } },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);
    } else if (type === 'tat') {
      data = await LoanApplication.find({ 'bankAssignments.tatBreached': true })
        .populate('connectorId', 'name').populate('companyId', 'companyName');
    } else if (type === 'interest-status') {
      // CHANGED: New report type — bank interest status breakdown
      data = await LoanApplication.aggregate([
        { $unwind: '$bankAssignments' },
        { $group: { _id: '$bankAssignments.interestStatus', count: { $sum: 1 } } }
      ]);
    } else if (type === 'unmask-history') {
      // CHANGED: New report type — unmask/select history for compliance
      data = await LoanApplication.find({ selectedBankId: { $ne: null } })
        .select('applicationId selectedBankName selectedAt connectorId maskHistory')
        .populate('connectorId', 'name')
        .sort({ selectedAt: -1 });
    } else {
      data = await LoanApplication.find(Object.keys(dateFilter).length ? { createdAt: dateFilter } : {})
        .populate('connectorId', 'name').populate('companyId', 'companyName')
        .sort({ createdAt: -1 }).limit(500);
    }

    res.json({ type, data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.exportExcel = async (req, res) => {
  try {
    const { entity } = req.params;
    let data = [], headers = [];

    if (entity === 'banks') {
      const banks = await Bank.find();
      headers = ['Bank Name', 'DSA Code', 'Supported Loans', 'City', 'Status'];
      data = banks.map(b => [b.bankName, b.dsaCode, b.supportedLoanTypes?.join(', '), b.city, b.status]);
    } else if (entity === 'companies') {
      const companies = await Company.find();
      headers = ['Company Name', 'Registration No', 'GST', 'City', 'Email', 'Status'];
      data = companies.map(c => [c.companyName, c.registrationNumber, c.gstNumber, c.city, c.email, c.status]);
    } else if (entity === 'connectors') {
      const connectors = await Connector.find().populate('userId', 'email');
      headers = ['Name', 'Mobile', 'Email', 'Total Leads', 'Status'];
      data = connectors.map(c => [c.name, c.mobile, c.email, c.totalLeads, c.status]);
    } else if (entity === 'applications') {
      const apps = await LoanApplication.find().populate('connectorId', 'name').populate('companyId', 'companyName');
      headers = ['App ID', 'Loan Type', 'Amount', 'Customer', 'Connector', 'Company', 'Banks Selected', 'Selected Bank', 'Overall Status', 'Date'];
      data = apps.map(a => [
        a.applicationId,
        a.loanType,
        a.loanAmount,
        a.applicantDetails?.name,
        a.connectorId?.name,
        a.companyId?.companyName,
        a.bankAssignments?.map(ba => ba.bankName).join(', '),
        a.selectedBankName || 'Not selected',
        a.overallStatus,
        a.createdAt?.toLocaleDateString()
      ]);
    } else if (entity === 'audit-logs') {
      // CHANGED: Export audit logs for compliance
      const logs = await AuditLog.find().populate('userId', 'name role').sort({ createdAt: -1 }).limit(5000);
      headers = ['Date', 'User', 'Role', 'Action', 'Description', 'IP Address'];
      data = logs.map(l => [
        new Date(l.createdAt).toLocaleString('en-IN'),
        l.userId?.name || 'Unknown',
        l.role,
        l.action,
        l.description,
        l.ipAddress || ''
      ]);
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(wb, ws, entity);
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Disposition', `attachment; filename=bankzone_${entity}_${Date.now()}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.importExcel = async (req, res) => {
  try {
    const { entity } = req.params;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const wb = XLSX.read(req.file.buffer || require('fs').readFileSync(req.file.path));
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws);

    let success = 0, failed = [];

    for (const row of rows) {
      try {
        if (entity === 'connectors') {
          const email = row['Email'] || row['email'];
          const name = row['Name'] || row['name'];
          if (!email || !name) { failed.push({ row, reason: 'Missing name or email' }); continue; }
          const exists = await User.findOne({ email });
          if (exists) { failed.push({ row, reason: 'Email already exists' }); continue; }
          const user = await User.create({ role: 'connector', name, email, mobile: row['Mobile'] || '', password: 'Connector@123' });
          await Connector.create({ userId: user._id, name, mobile: row['Mobile'] || '', email });
          success++;
        } else if (entity === 'companies') {
          const email = row['Email'] || row['email'];
          const companyName = row['Company Name'] || row['companyName'];
          if (!email || !companyName) { failed.push({ row, reason: 'Missing company name or email' }); continue; }
          const exists = await User.findOne({ email });
          if (exists) { failed.push({ row, reason: 'Email already exists' }); continue; }
          const user = await User.create({ role: 'company', name: companyName, email, password: 'Company@123' });
          await Company.create({ userId: user._id, companyName, email, city: row['City'] });
          success++;
        }
      } catch (e) { failed.push({ row, reason: e.message }); }
    }

    res.json({ success, failed: failed.length, failedRows: failed, message: `Imported ${success} records, ${failed.length} failed` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getImportTemplate = async (req, res) => {
  try {
    const { entity } = req.params;
    const wb = XLSX.utils.book_new();
    let headers = [];
    if (entity === 'connectors') headers = ['Name', 'Email', 'Mobile'];
    else if (entity === 'companies') headers = ['Company Name', 'Email', 'Mobile', 'City', 'Registration No', 'GST'];
    else if (entity === 'banks') headers = ['Bank Name', 'DSA Code', 'City', 'Email', 'Supported Loan Types (comma separated)'];
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Disposition', `attachment; filename=bankzone_${entity}_template.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};