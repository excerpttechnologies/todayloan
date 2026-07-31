// const express = require('express');
// const router = express.Router();
// const authCtrl = require('../controllers/authController');
// const adminCtrl = require('../controllers/adminController');
// const appCtrl = require('../controllers/applicationController');
// const mainCtrl = require('../controllers/mainController');
// const { auth, requireRole } = require('../middleware/auth');
// const upload = require('../utils/upload');
// const multer = require('multer');
// const memUpload = multer();

// // AUTH
// router.post('/auth/register', authCtrl.register);
// router.post('/auth/login', authCtrl.login);
// router.post('/auth/refresh', authCtrl.refresh);
// router.post('/auth/logout', auth, authCtrl.logout);
// router.get('/auth/me', auth, authCtrl.me);
// router.put('/auth/change-password', auth, authCtrl.changePassword);

// // DASHBOARD
// router.get('/dashboard/stats', auth, mainCtrl.getDashboard);

// // // routes/company.routes.js
// // router.post('/connectors', protect, authorize('company'), companyController.createConnector);
// // router.get('/connectors', protect, authorize('company'), companyController.getConnectors);




// // ADMIN
// router.get('/admin/dashboard/stats', auth, requireRole('admin'), adminCtrl.getDashboardStats);
// router.get('/admin/banks', auth, requireRole('admin'), adminCtrl.getBanks);
// router.post('/admin/banks', auth, requireRole('admin'), adminCtrl.createBank);
// router.put('/admin/banks/:id', auth, requireRole('admin'), adminCtrl.updateBank);
// router.delete('/admin/banks/:id', auth, requireRole('admin'), adminCtrl.deleteBank);
// router.get('/admin/companies', auth, requireRole('admin'), adminCtrl.getCompanies);
// router.post('/admin/companies', auth, requireRole('admin'), adminCtrl.createCompany);
// router.put('/admin/companies/:id', auth, requireRole('admin'), adminCtrl.updateCompany);
// router.get('/admin/connectors', auth, requireRole('admin'), adminCtrl.getConnectors);
// router.post('/admin/connectors', auth, requireRole('admin'), adminCtrl.createConnector);
// router.get('/admin/applications', auth, requireRole('admin'), adminCtrl.getAllApplications);
// router.get('/admin/users', auth, requireRole('admin'), adminCtrl.getUsers);
// router.put('/admin/users/:id/status', auth, requireRole('admin'), adminCtrl.updateUserStatus);
// router.get('/admin/audit-logs', auth, requireRole('admin'), adminCtrl.getAuditLogs);
// router.get('/admin/reports', auth, requireRole('admin'), adminCtrl.getReports);
// router.get('/admin/export/:entity', auth, requireRole('admin'), adminCtrl.exportExcel);
// router.get('/admin/import-template/:entity', auth, requireRole('admin'), adminCtrl.getImportTemplate);
// router.post('/admin/import/:entity', auth, requireRole('admin'), memUpload.single('file'), adminCtrl.importExcel);

// // LOAN APPLICATIONS
// router.post('/applications', auth, requireRole('connector'), appCtrl.createApplication);
// router.get('/applications', auth, appCtrl.getApplications);
// router.get('/applications/:id', auth, appCtrl.getApplicationById);
// router.get('/applications/:id/pdf', auth, appCtrl.generatePDF);
// router.post('/applications/:id/banks/:bankId/status', auth, requireRole('bank','sm','admin'), appCtrl.updateApplicationStatus);
// router.post('/applications/:id/banks/:bankId/query', auth, requireRole('bank','sm'), appCtrl.raiseQuery);
// router.post('/applications/:id/banks/:bankId/query/:queryId/reply', auth, requireRole('connector'), appCtrl.replyQuery);

// router.post('/applications/:id/banks/:bankId/interest', auth, requireRole('bank','sm'), appCtrl.updateInterestStatus);
// router.post('/applications/:id/banks/:bankId/download-docs', auth, requireRole('bank','sm'), appCtrl.downloadAndEmailDocs);

// // FILE UPLOAD
// router.post('/documents/upload', auth, upload.single('file'), appCtrl.uploadDocument);
// router.post('/documents/upload-multiple', auth, upload.array('files', 10), (req, res) => {
//   if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' });
//   const urls = req.files.map(f => ({
//     url: `${req.protocol}://${req.get('host')}/uploads/${req.query.folder || 'others'}/${f.filename}`,
//     filename: f.filename
//   }));
//   res.json({ urls });
// });

// // JOIN REQUESTS
// router.post('/join-requests', auth, requireRole('connector','bank'), mainCtrl.sendJoinRequest);
// router.get('/join-requests/incoming', auth, requireRole('company','admin'), mainCtrl.getIncomingRequests);
// router.get('/join-requests/sent', auth, requireRole('connector','bank'), mainCtrl.getSentRequests);
// router.put('/join-requests/:id/respond', auth, requireRole('company','admin'), mainCtrl.respondToRequest);

// // NOTIFICATIONS
// router.get('/notifications', auth, mainCtrl.getNotifications);
// router.put('/notifications/mark-all-read', auth, mainCtrl.markAllRead);
// router.put('/notifications/:id/read', auth, mainCtrl.markRead);

// // MESSAGES
// router.get('/messages', auth, mainCtrl.getMessages);
// router.post('/messages', auth, mainCtrl.sendMessage);
// router.post('/messages/:id/reply', auth, mainCtrl.replyMessage);

// // COMPANIES & BANKS LISTING
// router.get('/companies', auth, mainCtrl.getAllCompanies);
// router.get('/banks', auth, mainCtrl.getAllBanks);

// // COMMISSIONS
// router.get('/commissions', auth, mainCtrl.getCommissions);

// // BANK SM MANAGEMENT
// router.get('/bank/sales-managers', auth, requireRole('bank'), mainCtrl.getSMs);
// router.post('/bank/sales-managers', auth, requireRole('bank'), mainCtrl.createSM);

// // COMPANY SPECIFIC
// router.get('/company/connectors', auth, requireRole('company'), mainCtrl.getCompanyConnectors);
// router.get('/company/banks', auth, requireRole('company'), mainCtrl.getCompanyBanks);
// router.post('/company/connectors', auth, requireRole('company'), mainCtrl.createCompanyConnector); // ← ADD THIS
// router.post('/company/banks', auth, requireRole('company'), mainCtrl.createCompanyBank);  // ← ADD THIS
// module.exports = router;






const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const adminCtrl = require('../controllers/adminController');
const appCtrl = require('../controllers/applicationController');
const mainCtrl = require('../controllers/mainController');
const bankPolicyCtrl = require('../controllers/bankPolicyController'); // NEW: Bank Policy module
const excelUpload = require('../middleware/excelUpload'); // NEW: Bank Policy Excel import (separate from KYC upload)
const { auth, requireRole } = require('../middleware/auth');
const upload = require('../utils/upload');
const multer = require('multer');
const memUpload = multer();

// AUTH
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.post('/auth/refresh', authCtrl.refresh);
router.post('/auth/logout', auth, authCtrl.logout);
router.get('/auth/me', auth, authCtrl.me);
router.put('/auth/change-password', auth, authCtrl.changePassword);

// DASHBOARD
router.get('/dashboard/stats', auth, mainCtrl.getDashboard);

// ADMIN
router.get('/admin/dashboard/stats', auth, requireRole('admin'), adminCtrl.getDashboardStats);
router.get('/admin/banks', auth, requireRole('admin'), adminCtrl.getBanks);
router.post('/admin/banks', auth, requireRole('admin'), adminCtrl.createBank);
router.put('/admin/banks/:id', auth, requireRole('admin'), adminCtrl.updateBank);
router.delete('/admin/banks/:id', auth, requireRole('admin'), adminCtrl.deleteBank);
router.get('/admin/companies', auth, requireRole('admin'), adminCtrl.getCompanies);
router.post('/admin/companies', auth, requireRole('admin'), adminCtrl.createCompany);
router.put('/admin/companies/:id', auth, requireRole('admin'), adminCtrl.updateCompany);
router.get('/admin/connectors', auth, requireRole('admin'), adminCtrl.getConnectors);
router.post('/admin/connectors', auth, requireRole('admin'), adminCtrl.createConnector);
router.get('/admin/applications', auth, requireRole('admin'), adminCtrl.getAllApplications);
router.get('/admin/users', auth, requireRole('admin'), adminCtrl.getUsers);
router.put('/admin/users/:id/status', auth, requireRole('admin'), adminCtrl.updateUserStatus);
router.get('/admin/audit-logs', auth, requireRole('admin'), adminCtrl.getAuditLogs);
// CHANGED: New endpoint — login activity logs for Corporate DSA monitoring
router.get('/admin/login-activity', auth, requireRole('admin'), adminCtrl.getLoginActivityLogs);
router.get('/admin/reports', auth, requireRole('admin'), adminCtrl.getReports);
router.get('/admin/export/:entity', auth, requireRole('admin'), adminCtrl.exportExcel);
router.get('/admin/import-template/:entity', auth, requireRole('admin'), adminCtrl.getImportTemplate);
router.post('/admin/import/:entity', auth, requireRole('admin'), memUpload.single('file'), adminCtrl.importExcel);

// BANK POLICY (new, separate module — Admin and Bank can manage)
router.get('/admin/bank-policies', auth, requireRole('admin', 'bank'), bankPolicyCtrl.getPolicies);
router.get('/admin/bank-policies/template', auth, requireRole('admin', 'bank'), bankPolicyCtrl.downloadTemplate);
router.post('/admin/bank-policies/import', auth, requireRole('admin', 'bank'), excelUpload.single('file'), bankPolicyCtrl.importFromExcel);
router.get('/admin/bank-policies/:id', auth, requireRole('admin', 'bank'), bankPolicyCtrl.getPolicyById);
router.post('/admin/bank-policies', auth, requireRole('admin', 'bank'), bankPolicyCtrl.createPolicy);
router.put('/admin/bank-policies/:id', auth, requireRole('admin', 'bank'), bankPolicyCtrl.updatePolicy);
router.put('/admin/bank-policies/:id/toggle-status', auth, requireRole('admin', 'bank'), bankPolicyCtrl.togglePolicyStatus);
router.get('/bank-policy/my-bank', auth, requireRole('bank'), bankPolicyCtrl.getMyBank);

// LOAN APPLICATIONS
router.post('/applications', auth, requireRole('connector'), appCtrl.createApplication);
router.get('/applications', auth, appCtrl.getApplications);
router.get('/applications/:id', auth, appCtrl.getApplicationById);
router.get('/applications/:id/pdf', auth, appCtrl.generatePDF);

// Banker: update loan processing status (only after being selected by connector)
router.post('/applications/:id/banks/:bankId/status', auth, requireRole('bank', 'sm', 'admin'), appCtrl.updateApplicationStatus);

// Banker: raise a query on the lead
router.post('/applications/:id/banks/:bankId/query', auth, requireRole('bank', 'sm'), appCtrl.raiseQuery);

// Connector: reply to a bank's query
router.post('/applications/:id/banks/:bankId/query/:queryId/reply', auth, requireRole('connector'), appCtrl.replyQuery);

// CHANGED: Removed old unmask-request (bank-initiated) and unmask-approve (connector-approved) routes.
// REPLACED BY: Connector directly selects one preferred bank after viewing all interest responses.
// POST /applications/:id/banks/:bankId/select  — connector selects bank → triggers unmask automatically
router.post('/applications/:id/banks/:bankId/select', auth, requireRole('connector'), appCtrl.selectBank);

// Banker: update interest status — Interested / Not Interested / Need More Info
router.post('/applications/:id/banks/:bankId/interest', auth, requireRole('bank', 'sm'), appCtrl.updateInterestStatus);

// Bank Policy module: on-demand eligibility recheck for one bank on an application
router.get('/applications/:id/banks/:bankId/eligibility', auth, appCtrl.checkEligibility);

// Selected banker only: download docs (auto-emailed to bank's registered email)
// router.post('/applications/:id/banks/:bankId/download-docs', auth, requireRole('bank', 'sm'), appCtrl.downloadAndEmailDocs);

// 10/7

router.post('/applications/:id/banks/:bankId/download-docs', auth, requireRole('bank', 'sm'), appCtrl.downloadAndEmailDocs);
router.post('/applications/:id/banks/:bankId/email-docs', auth, requireRole('bank', 'sm'), appCtrl.emailDocumentsToBank);

// FILE UPLOAD
router.post('/documents/upload', auth, upload.single('file'), appCtrl.uploadDocument);
router.post('/documents/upload-multiple', auth, upload.array('files', 10), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' });
  const urls = req.files.map(f => ({
    url: `${req.protocol}://${req.get('host')}/uploads/${req.query.folder || 'others'}/${f.filename}`,
    filename: f.filename
  }));
  res.json({ urls });
});

// JOIN REQUESTS
router.post('/join-requests', auth, requireRole('connector', 'bank'), mainCtrl.sendJoinRequest);
router.get('/join-requests/incoming', auth, requireRole('company', 'admin'), mainCtrl.getIncomingRequests);
router.get('/join-requests/sent', auth, requireRole('connector', 'bank'), mainCtrl.getSentRequests);
router.put('/join-requests/:id/respond', auth, requireRole('company', 'admin'), mainCtrl.respondToRequest);

// NOTIFICATIONS
router.get('/notifications', auth, mainCtrl.getNotifications);
router.put('/notifications/mark-all-read', auth, mainCtrl.markAllRead);
router.put('/notifications/:id/read', auth, mainCtrl.markRead);
router.get('/applications/:id/notification-detail', auth, appCtrl.getNotificationDetail);

// MESSAGES
router.get('/messages', auth, mainCtrl.getMessages);
router.post('/messages', auth, mainCtrl.sendMessage);
router.post('/messages/:id/reply', auth, mainCtrl.replyMessage);

// COMPANIES & BANKS LISTING
router.get('/companies', auth, mainCtrl.getAllCompanies);
router.get('/banks', auth, mainCtrl.getAllBanks);

// COMMISSIONS
router.get('/commissions', auth, mainCtrl.getCommissions);

// BANK SM MANAGEMENT
router.get('/bank/sales-managers', auth, requireRole('bank'), mainCtrl.getSMs);
router.post('/bank/sales-managers', auth, requireRole('bank'), mainCtrl.createSM);

// COMPANY SPECIFIC
router.get('/company/connectors', auth, requireRole('company'), mainCtrl.getCompanyConnectors);
router.get('/company/banks', auth, requireRole('company'), mainCtrl.getCompanyBanks);
router.post('/company/connectors', auth, requireRole('company'), mainCtrl.createCompanyConnector);
router.post('/company/banks', auth, requireRole('company'), mainCtrl.createCompanyBank);

module.exports = router;