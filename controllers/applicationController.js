


// const LoanApplication = require('../models/LoanApplication');
// const Connector = require('../models/Connector');
// const Company = require('../models/Company');
// const Bank = require('../models/Bank');
// const { sendNotification } = require('../utils/notifications');
// const { applyMasking, maskMobile, maskEmail, maskAadhaar, maskPAN, maskDOB, maskName } = require('../utils/masking');
// const { Commission } = require('../models/index');
// const PDFDocument = require('pdfkit');
// const nodemailer = require('nodemailer');
// const { AuditLog } = require('../models/index');

// const getMailer = () => nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: process.env.SMTP_PORT || 587,
//   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
// });

// const logAudit = async (userId, role, action, targetId, targetType, description, metadata = {}) => {
//   try {
//     await AuditLog.create({ userId, role, action, targetId, targetType, description, metadata });
//   } catch (e) { console.error('Audit log error', e); }
// };

// // ─── CREATE APPLICATION ───────────────────────────────────────────────────────
// // ─── CREATE APPLICATION ───────────────────────────────────────────────────────
// exports.createApplication = async (req, res) => {
//   try {
//     console.log('🔍 ===== CREATE APPLICATION START =====');
    
//     const connectorDoc = await Connector.findOne({ userId: req.user._id });
//     if (!connectorDoc) {
//       console.log('❌ Connector not found');
//       return res.status(403).json({ message: 'Only connectors can submit applications' });
//     }

//     const approvedCompany = connectorDoc.companyRelations.find(r => r.status === 'approved');
//     if (!approvedCompany) {
//       console.log('❌ No approved company');
//       return res.status(400).json({ message: 'You must be approved by a DSA company before submitting applications' });
//     }


//     //shree7
//     const applicantDetails = req.body.applicantDetails || {};
// const { bankIds, ...rest } = req.body;


//     console.log('📌 Applicant Details:', JSON.stringify(applicantDetails, null, 2));
   
//      console.log('📌 Documents received:', JSON.stringify(rest.documents, null, 2));

//     if (!bankIds || bankIds.length === 0) {
//       return res.status(400).json({ message: 'Please select at least one bank' });
//     }

//     // 🔥 FIX: Ensure DOB is properly handled (Date field)
//     let dob = null;
//     if (applicantDetails.dob) {
//       dob = new Date(applicantDetails.dob);
//       if (isNaN(dob.getTime())) {
//         dob = null;
//       }
//     }

//     // 🔥 Build applicantDetails matching the schema exactly
//     const applicantData = {
//       name: applicantDetails.name || '',
//       nameMasked: maskName(applicantDetails.name || ''),
//       mobile: applicantDetails.mobileRaw || applicantDetails.mobile || '',
//       mobileMasked: maskMobile(applicantDetails.mobileRaw || applicantDetails.mobile || ''),
//       email: applicantDetails.email || '',
//       emailMasked: maskEmail(applicantDetails.email || ''),
//       dob: dob,  // Date type
//       dobMasked: maskDOB(applicantDetails.dob || ''),
//       aadhaar: applicantDetails.aadhaarRaw || applicantDetails.aadhaar || '',
//       aadhaarMasked: maskAadhaar(applicantDetails.aadhaarRaw || applicantDetails.aadhaar || ''),
//       pan: applicantDetails.panRaw || applicantDetails.pan || '',
//       panMasked: maskPAN(applicantDetails.panRaw || applicantDetails.pan || ''),
//       presentAddress: applicantDetails.presentAddress || '',
//       presentPincode: applicantDetails.presentPincode || '',
//       presentProperty: applicantDetails.presentProperty || 'Rented',
//       permanentAddress: applicantDetails.permanentAddress || '',
//       permanentProperty: applicantDetails.permanentProperty || 'Owned',
//       maritalStatus: applicantDetails.maritalStatus || 'Single',
//       qualification: applicantDetails.qualification || '',
//       motherName: applicantDetails.motherName || '',
//       fatherName: applicantDetails.fatherName || '',
//     };

//     // 🔥 Validate required fields
//     if (!applicantData.name) {
//       return res.status(400).json({ message: 'Applicant name is required' });
//     }
//     if (!applicantData.mobile) {
//       return res.status(400).json({ message: 'Mobile number is required' });
//     }
//     if (!applicantData.email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }
//     if (!applicantData.aadhaar) {
//       return res.status(400).json({ message: 'Aadhaar number is required' });
//     }
//     if (!applicantData.pan) {
//       return res.status(400).json({ message: 'PAN number is required' });
//     }

//     console.log('📌 Applicant Data:', JSON.stringify(applicantData, null, 2));

//     const selectedBanks = await Bank.find({ _id: { $in: bankIds } });
//     console.log('📌 Selected Banks:', selectedBanks.length);

//     // 🔥 Build bankAssignments matching the schema
//     const bankAssignments = selectedBanks.map(bank => ({
//       bankId: bank._id,
//       bankName: bank.bankName,
//       status: 'submitted',
//       unmaskApproved: false,
//       interestStatus: 'pending',
//       interestNote: '',
//       statusHistory: [{
//         status: 'submitted',
//         changedByName: req.user.name,
//         changedAt: new Date(),
//         notes: 'Masked lead submitted by connector'
//       }],
//       queries: [],
//       documentDownloads: []
//     }));

//     // 🔥 Build incomeDetails
//     const incomeDetails = rest.incomeDetails || {};
    
//     // 🔥 Build the complete application object
//     const applicationData = {
//   connectorId: connectorDoc._id,
//   companyId: approvedCompany.companyId,
//   loanType: rest.loanType || 'Personal Loan',
//   loanAmount: Number(rest.loanAmount) || 0,
//   loanPurpose: rest.loanPurpose || 'New Loan',
//   applicantDetails: applicantData,
//   incomeDetails: {
//     employmentType: incomeDetails.employmentType || 'Salaried',
//     companyName: incomeDetails.companyName || '',
//     companyCategory: incomeDetails.companyCategory || 'A',
//     netSalaryMonth1: incomeDetails.netSalaryMonth1 ? Number(incomeDetails.netSalaryMonth1) : 0,
//   netSalaryMonth2: incomeDetails.netSalaryMonth2 ? Number(incomeDetails.netSalaryMonth2) : 0,
//   netSalaryMonth3: incomeDetails.netSalaryMonth3 ? Number(incomeDetails.netSalaryMonth3) : 0,
//     grossSalary: incomeDetails.grossSalary ? Number(incomeDetails.grossSalary) : 0,
//     salaryMode: incomeDetails.salaryMode || 'Account Transfer',
//     designation: incomeDetails.designation || '',
//     doj: incomeDetails.doj || '',
//     totalExperience: incomeDetails.totalExperience || '',
//     firmName: incomeDetails.firmName || '',
//     companyType: incomeDetails.companyType || 'Proprietorship',
//     natureOfBusiness: incomeDetails.natureOfBusiness || '',
//     businessVintage: incomeDetails.businessVintage || '',
//   },
//   businessDetails: rest.businessDetails || {},
//   propertyDetails: rest.propertyDetails || {},
//   vehicleDetails: rest.vehicleDetails || {},
//   existingLoans: rest.existingLoans || [],
//   cibilScore: Number(rest.cibilScore) || 0,
//   documents: rest.documents || {},   // ✅ FIXED — was hardcoded to {}
//   bankAssignments: bankAssignments,
//   selectedBankId: null,
//   selectedBankName: null,
//   selectedAt: null,
//   overallStatus: 'active',
//   maskHistory: [],
//   coApplicants: [],
//   recentEnquiries: []
// };

//     console.log('📌 Creating application...');
//     const application = new LoanApplication(applicationData);
//     await application.save();
    
//     console.log('✅ Application created:', application._id);
//     console.log('✅ Application ID:', application.applicationId);

//     await Connector.findByIdAndUpdate(connectorDoc._id, { $inc: { totalLeads: 1 } });

//     const company = await Company.findById(approvedCompany.companyId);
//     if (company?.userId) {
//       await sendNotification(company.userId, 'New Lead Created',
//         `New ${rest.loanType} lead submitted by ${req.user.name}`, 'application', application._id);
//     }

//     await logAudit(req.user._id, req.user.role, 'create_lead', application._id, 'LoanApplication',
//       `Connector ${req.user.name} created lead ${application.applicationId} and submitted to ${selectedBanks.length} bank(s)`,
//       { bankIds, loanType: rest.loanType });

//     console.log('🔍 ===== CREATE APPLICATION END =====');
//     res.status(201).json(application);
    
//   } catch (err) {
//     console.error('❌ ERROR in createApplication:', err);
//     console.error('❌ Stack trace:', err.stack);
    
//     // 🔥 Check for validation errors
//     if (err.name === 'ValidationError') {
//       const errors = Object.values(err.errors).map(e => e.message);
//       return res.status(400).json({ 
//         message: 'Validation error', 
//         errors: errors 
//       });
//     }
    
//     res.status(500).json({ 
//       message: err.message,
//       stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//     });
//   }
// };




// //shree

// // ─── GET APPLICATIONS LIST ────────────────────────────────────────────────────
// // ─── GET APPLICATIONS LIST ────────────────────────────────────────────────────
// exports.getApplications = async (req, res) => {
//   try {
//     const { role, _id } = req.user;
//     const { loanType, status, page = 1, limit = 20, search } = req.query;
//     let query = {};

//     if (role === 'connector') {
//       const connector = await Connector.findOne({ userId: _id });
//       if (connector) query.connectorId = connector._id;
//     } else if (role === 'company') {
//       const company = await Company.findOne({ userId: _id });
//       if (company) query.companyId = company._id;
//     } else if (role === 'bank' || role === 'sm') {
//       let bankId;
//       if (role === 'bank') {
//         const bank = await Bank.findOne({ userId: _id });
//         if (bank) bankId = bank._id;
//       } else {
//         const bank = await Bank.findOne({ 'salesManagers.smId': _id });
//         if (bank) bankId = bank._id;
//       }
//       if (bankId) query['bankAssignments.bankId'] = bankId;
//     }

//     if (loanType) query.loanType = loanType;
//     if (status) query.overallStatus = status;
//     if (search) query['applicantDetails.name'] = { $regex: search, $options: 'i' };

//     const apps = await LoanApplication.find(query)
//       .populate('connectorId', 'name email mobile')
//       .populate('companyId', 'companyName')
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * Number(limit))
//       .limit(Number(limit));

//     const total = await LoanApplication.countDocuments(query);

//     let processedApps = apps;

//     if (role === 'bank' || role === 'sm') {
//       let bankId;
//       if (role === 'bank') {
//         const bank = await Bank.findOne({ userId: _id });
//         if (bank) bankId = bank._id;
//       } else {
//         const bank = await Bank.findOne({ 'salesManagers.smId': _id });
//         if (bank) bankId = bank._id;
//       }

//       console.log('🔍 ===== GET APPLICATIONS DEBUG =====');
//       console.log('📌 Role:', role);
//       console.log('📌 Bank ID:', bankId?.toString() || 'NULL');
//       console.log('📌 Total Apps:', apps.length);

//       processedApps = apps.map((app, index) => {
//         const assignment = app.bankAssignments?.find(ba => ba.bankId?.toString() === bankId?.toString());
        
//         const isSelectedBank = app.selectedBankId?.toString() === bankId?.toString();
//         const isUnmaskApproved = assignment?.unmaskApproved === true;
        
//         console.log(`📌 App ${index + 1}: ${app.applicationId}`);
//         console.log(`   - selectedBankId: ${app.selectedBankId?.toString() || 'NULL'}`);
//         console.log(`   - Is Selected: ${isSelectedBank}`);
//         console.log(`   - unmaskApproved: ${isUnmaskApproved}`);
//         console.log(`   - Returning: ${isSelectedBank && isUnmaskApproved ? '✅ UNMASKED' : '❌ MASKED'}`);
        
//         if (isSelectedBank && isUnmaskApproved) {
//           return app.toObject();
//         }
//         return applyMasking(app);
//       });
//       console.log('🔍 ===== DEBUG END =====');
//     } else if (role === 'company') {
//       processedApps = apps.map(app => app.toObject());
//     }

//     res.json({ applications: processedApps, total, pages: Math.ceil(total / Number(limit)) });
//   } catch (err) {
//     console.error('Error in getApplications:', err);
//     res.status(500).json({ message: err.message });
//   }
// };




// //shree

// // ─── GET APPLICATION BY ID ────────────────────────────────────────────────────
// exports.getApplicationById = async (req, res) => {
//   try {
//     const { role, _id } = req.user;
//     const app = await LoanApplication.findById(req.params.id)
//       .populate('connectorId', 'name email mobile')
//       .populate('companyId', 'companyName email');

//     if (!app) return res.status(404).json({ message: 'Application not found' });

//     // Admin sees everything
//     if (role === 'admin') return res.json(app);

//     // Connector sees their own application fully
//     if (role === 'connector') {
//       const connector = await Connector.findOne({ userId: _id });
//       if (!connector || app.connectorId?._id?.toString() !== connector._id.toString()) {
//         return res.status(403).json({ message: 'Access denied' });
//       }
//       return res.json(app);
//     }

//     // Bank / SM: only unmasked if selected
//     if (role === 'bank' || role === 'sm') {
//       let bankId;
//       if (role === 'bank') {
//         const bank = await Bank.findOne({ userId: _id });
//         if (bank) bankId = bank._id;
//       } else {
//         const bank = await Bank.findOne({ 'salesManagers.smId': _id });
//         if (bank) bankId = bank._id;
//       }

//       if (!bankId) {
//         return res.status(403).json({ message: 'Bank profile not found' });
//       }

//       const assignment = app.bankAssignments.find(ba => {
//         return ba.bankId && ba.bankId.toString() === bankId.toString();
//       });
      
//       if (!assignment) {
//         return res.status(403).json({ message: 'Access denied - Application not assigned to your bank' });
//       }

//       // 🔥 DEBUG LOGS
//       console.log('🔍 ===== DEBUG START =====');
//       console.log('📌 Bank ID:', bankId.toString());
//       console.log('📌 Selected Bank ID:', app.selectedBankId?.toString() || 'NULL');
//       console.log('📌 Is Selected:', app.selectedBankId?.toString() === bankId.toString());
//       console.log('📌 unmaskApproved:', assignment.unmaskApproved);
      
//       // ✅ Check if this bank is SELECTED and UNMASK APPROVED
//       const isSelectedBank = app.selectedBankId && app.selectedBankId.toString() === bankId.toString();
//       const isUnmaskApproved = assignment.unmaskApproved === true;
//       const shouldUnmask = isSelectedBank && isUnmaskApproved;
      
//       console.log('📌 Should Unmask:', shouldUnmask);
//       console.log('📌 Returning:', shouldUnmask ? '✅ UNMASKED' : '❌ MASKED');
      
//       // 🔥 Print the actual data being returned
//       if (shouldUnmask) {
//         console.log('📌 Mobile (unmasked):', app.applicantDetails?.mobile);
//         console.log('📌 PAN (unmasked):', app.applicantDetails?.pan);
//         console.log('📌 Aadhaar (unmasked):', app.applicantDetails?.aadhaar);
//       }
//       console.log('🔍 ===== DEBUG END =====');

//       // ✅ Only show unmasked data if:
//       // 1. This bank IS the selected bank
//       // 2. This bank has unmaskApproved = true
//       if (shouldUnmask) {
//         // Return the original app with ALL data unmasked
//         return res.json(app);
//       }
      
//       // ❌ Return masked data
//       return res.json(applyMasking(app));
//     }

//     // Corporate DSA: full visibility
//     if (role === 'company') {
//       const company = await Company.findOne({ userId: _id });
//       if (!company || app.companyId?._id?.toString() !== company._id.toString()) {
//         return res.status(403).json({ message: 'Access denied' });
//       }
//       return res.json(app);
//     }

//     res.json(app);
//   } catch (err) {
//     console.error('Error in getApplicationById:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── BANKER: UPDATE INTEREST STATUS ──────────────────────────────────────────
// exports.updateInterestStatus = async (req, res) => {
//   try {
//     const { bankId } = req.params;
//     const { interestStatus, interestNote } = req.body;

//     const validStatuses = ['interested', 'not_interested', 'need_more_info'];
//     if (!validStatuses.includes(interestStatus)) {
//       return res.status(400).json({ message: 'interestStatus must be: interested, not_interested, or need_more_info' });
//     }

//     const app = await LoanApplication.findById(req.params.id);
//     if (!app) return res.status(404).json({ message: 'Application not found' });

//     const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

//     assignment.interestStatus = interestStatus;
//     assignment.interestNote = interestNote || '';
//     assignment.interestUpdatedAt = new Date();
//     await app.save();

//     // Notify connector
//     const connector = await Connector.findById(app.connectorId);
//     if (connector?.userId) {
//       await sendNotification(connector.userId, 'Bank Response Received',
//         `${assignment.bankName} responded: ${interestStatus.replace(/_/g, ' ').toUpperCase()} for ${app.applicationId}`,
//         'stage_update', app._id);
//     }

//     await logAudit(req.user._id, req.user.role, 'interest_status_update', app._id, 'LoanApplication',
//       `${req.user.name} (${assignment.bankName}) updated interest to ${interestStatus} for ${app.applicationId}`,
//       { bankId, interestStatus, interestNote });

//     res.json({ message: 'Interest status updated', assignment });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// //shree


// // ─── CONNECTOR: SELECT PREFERRED BANK ────────────────────────────────────────
// exports.selectBank = async (req, res) => {
//   try {
//     console.log('🔍 ===== SELECT BANK START =====');
//     const { bankId } = req.params;
//     console.log('📌 Bank ID to select:', bankId);

//     const app = await LoanApplication.findById(req.params.id);
//     if (!app) {
//       console.log('❌ Application not found');
//       return res.status(404).json({ message: 'Application not found' });
//     }
//     console.log('📌 Application ID:', app.applicationId);
//     console.log('📌 Current selectedBankId:', app.selectedBankId);
//     console.log('📌 Current selectedBankName:', app.selectedBankName);

//     const connector = await Connector.findOne({ userId: req.user._id });
//     if (!connector || app.connectorId?.toString() !== connector._id.toString()) {
//       console.log('❌ Only connector can select bank');
//       return res.status(403).json({ message: 'Only the submitting connector can select a bank' });
//     }

//     if (app.selectedBankId) {
//       console.log('❌ Bank already selected');
//       return res.status(400).json({ message: `Bank already selected: ${app.selectedBankName}` });
//     }

//     const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     if (!assignment) {
//       console.log('❌ Bank not assigned');
//       return res.status(404).json({ message: 'Bank not assigned to this application' });
//     }
//     console.log('📌 Bank Name:', assignment.bankName);
//     console.log('📌 Interest Status:', assignment.interestStatus);
//     console.log('📌 Current unmaskApproved:', assignment.unmaskApproved);

//     if (assignment.interestStatus !== 'interested') {
//       console.log('❌ Bank not interested');
//       return res.status(400).json({ 
//         message: `Cannot select ${assignment.bankName}. They ${assignment.interestStatus === 'not_interested' ? 'declined' : 'haven\'t responded yet'}.` 
//       });
//     }

//     // ✅ SET selected bank and unmask approval
//     app.selectedBankId = assignment.bankId;
//     app.selectedBankName = assignment.bankName;
//     app.selectedAt = new Date();
//     assignment.unmaskApproved = true;
//     assignment.unmaskApprovedAt = new Date();

//     app.maskHistory.push({
//       action: 'unmasked',
//       performedBy: req.user._id,
//       performedByName: req.user.name,
//       bankId: assignment.bankId,
//       bankName: assignment.bankName,
//       performedAt: new Date()
//     });

//     await app.save();
//     console.log('✅ Application saved successfully');

//     // 🔥 Verify after save
//     const savedApp = await LoanApplication.findById(req.params.id);
//     console.log('📌 AFTER SAVE - selectedBankId:', savedApp.selectedBankId);
//     console.log('📌 AFTER SAVE - selectedBankName:', savedApp.selectedBankName);
    
//     const savedAssignment = savedApp.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     console.log('📌 AFTER SAVE - unmaskApproved:', savedAssignment?.unmaskApproved);
//     console.log('📌 AFTER SAVE - Mobile:', savedApp.applicantDetails?.mobile);
//     console.log('📌 AFTER SAVE - PAN:', savedApp.applicantDetails?.pan);
//     console.log('📌 AFTER SAVE - Aadhaar:', savedApp.applicantDetails?.aadhaar);
//     console.log('🔍 ===== SELECT BANK END =====');

//     // Notify selected bank
//     const bank = await Bank.findById(bankId);
//     if (bank?.userId) {
//       await sendNotification(bank.userId, 'You Have Been Selected!',
//         `Connector selected your bank for ${app.applicationId}. Customer details are now fully visible.`,
//         'unmask', app._id);
//     }

//     const company = await Company.findById(app.companyId);
//     if (company?.userId) {
//       await sendNotification(company.userId, 'Bank Selected',
//         `${req.user.name} selected ${assignment.bankName} for ${app.applicationId}`,
//         'application', app._id);
//     }

//     await logAudit(req.user._id, req.user.role, 'bank_selected', app._id, 'LoanApplication',
//       `Connector ${req.user.name} selected ${assignment.bankName} for ${app.applicationId}`,
//       { bankId, bankName: assignment.bankName });

//     res.json({ 
//       message: `${assignment.bankName} selected. Customer details are now unmasked for this bank.`, 
//       application: app 
//     });
//   } catch (err) {
//     console.error('❌ Error in selectBank:', err);
//     res.status(500).json({ message: err.message });
//   }
// };



// // ─── SELECTED BANKER: DOWNLOAD DOCUMENTS & EMAIL ────────────────────────────
// // ─── SELECTED BANKER: DOWNLOAD DOCUMENTS ────────────────────────────
// exports.downloadAndEmailDocs = async (req, res) => {
//   try {
//     const { bankId } = req.params;
//     const app = await LoanApplication.findById(req.params.id)
//       .populate('connectorId', 'name email')
//       .populate('companyId', 'companyName');
//     if (!app) return res.status(404).json({ message: 'Application not found' });

//     const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

//     // ✅ Only selected bank with unmask approval can download
//     if (!assignment.unmaskApproved || app.selectedBankId?.toString() !== bankId) {
//       return res.status(403).json({
//         message: 'Documents are only available after the connector selects your bank'
//       });
//     }

//     const docs = app.documents || {};
//     const docList = [];
//     if (docs.panCard?.url) docList.push({ name: 'PAN Card', url: docs.panCard.url });
//     if (docs.aadhaarCard?.url) docList.push({ name: 'Aadhaar Card', url: docs.aadhaarCard.url });
//     if (docs.photo?.url) docList.push({ name: 'Photo', url: docs.photo.url });
//     if (docs.form16?.url) docList.push({ name: 'Form 16', url: docs.form16.url });
//     if (docs.saleDeed?.url) docList.push({ name: 'Sale Deed', url: docs.saleDeed.url });
//     (docs.payslips || []).forEach((p, i) => p.url && docList.push({ name: `Payslip ${i + 1}`, url: p.url }));
//     (docs.bankStatements || []).forEach((s, i) => s.url && docList.push({ name: `Bank Statement ${i + 1}`, url: s.url }));
//     (docs.propertyDocs || []).forEach(d => d.url && docList.push({ name: d.name || 'Property Doc', url: d.url }));
//     (docs.others || []).forEach(d => d.url && docList.push({ name: d.name || 'Other', url: d.url }));

//     // Log each document download (kept — good for audit trail)
//     docList.forEach(d => {
//       assignment.documentDownloads.push({
//         downloadedBy: req.user.name,
//         downloadedByUserId: req.user._id,
//         fileName: d.name,
//         downloadedAt: new Date()
//       });
//     });
//     await app.save();

//     await logAudit(req.user._id, req.user.role, 'document_download', app._id, 'LoanApplication',
//       `${req.user.name} (${assignment.bankName}) downloaded ${docList.length} document(s) for ${app.applicationId}`,
//       { bankId, docCount: docList.length });

//     // ✅ No email — just return the list, frontend downloads directly
//     res.json({ message: 'Documents retrieved', documents: docList });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── BANKER: UPDATE LOAN STATUS ──────────────────────────────────────────────
// exports.updateApplicationStatus = async (req, res) => {
//   try {
//     const { bankId } = req.params;
//     const { status, notes, sanctionAmount, sanctionDate, sanctionLetterUrl,
//       disbursementAmount, disbursementDate, disbursementAccount, rejectionReason } = req.body;

//     const app = await LoanApplication.findById(req.params.id);
//     if (!app) return res.status(404).json({ message: 'Application not found' });

//     const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     if (!assignment) return res.status(404).json({ message: 'Bank assignment not found' });

//     // ✅ Only selected bank can update loan processing status
//     if (!app.selectedBankId || app.selectedBankId?.toString() !== bankId) {
//       return res.status(403).json({ 
//         message: `Only the selected bank (${app.selectedBankName || 'None'}) can update loan processing status` 
//       });
//     }

//     const prevStatus = assignment.status;
//     assignment.status = status;
//     assignment.statusHistory.push({
//       status,
//       changedBy: req.user._id,
//       changedByName: req.user.name,
//       changedAt: new Date(),
//       notes
//     });

//     if (sanctionAmount) assignment.sanctionAmount = sanctionAmount;
//     if (sanctionDate) assignment.sanctionDate = sanctionDate;
//     if (sanctionLetterUrl) assignment.sanctionLetterUrl = sanctionLetterUrl;
//     if (disbursementAmount) assignment.disbursementAmount = disbursementAmount;
//     if (disbursementDate) assignment.disbursementDate = disbursementDate;
//     if (disbursementAccount) assignment.disbursementAccount = disbursementAccount;
//     if (rejectionReason) assignment.rejectionReason = rejectionReason;

//     // Update overall status
//     app.overallStatus = status;
//     await app.save();

//     // Notify connector
//     const connector = await Connector.findById(app.connectorId);
//     if (connector?.userId) {
//       await sendNotification(connector.userId, 'Loan Status Update',
//         `${assignment.bankName}: ${status.replace(/_/g, ' ').toUpperCase()}`, 'stage_update', app._id);
//     }

//     // Auto commission on disbursement
//     if (status === 'disbursed' && disbursementAmount) {
//       const commissionRate = 1.5;
//       const commissionAmount = (disbursementAmount * commissionRate) / 100;
//       await Commission.create({
//         connectorId: app.connectorId,
//         applicationId: app._id,
//         loanType: app.loanType,
//         loanAmount: disbursementAmount,
//         commissionRate,
//         commissionAmount
//       });
//       if (connector?.userId) {
//         await sendNotification(connector.userId, 'Commission Credited',
//           `Commission of ₹${commissionAmount.toLocaleString('en-IN')} credited for ${app.applicationId}`,
//           'commission', app._id);
//       }
//     }

//     await logAudit(req.user._id, req.user.role, 'status_update', app._id, 'LoanApplication',
//       `${req.user.name} updated status from ${prevStatus} to ${status} for ${app.applicationId}`,
//       { bankId, prevStatus, newStatus: status });

//     res.json({ message: 'Status updated', assignment });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── BANKER: RAISE QUERY ──────────────────────────────────────────────────────
// exports.raiseQuery = async (req, res) => {
//   try {
//     const { bankId } = req.params;
//     const { question } = req.body;

//     const app = await LoanApplication.findById(req.params.id);
//     const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

//     assignment.queries.push({
//       raisedBy: req.user._id,
//       raisedByName: req.user.name,
//       question,
//       status: 'pending'
//     });
//     assignment.status = 'query_raised';
//     assignment.statusHistory.push({
//       status: 'query_raised',
//       changedBy: req.user._id,
//       changedByName: req.user.name,
//       changedAt: new Date(),
//       notes: question
//     });
//     await app.save();

//     const connector = await Connector.findById(app.connectorId);
//     if (connector?.userId) {
//       await sendNotification(connector.userId, 'Query Raised',
//         `${assignment.bankName} raised a query on ${app.applicationId}`, 'query', app._id);
//     }

//     res.json({ message: 'Query raised' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── CONNECTOR: REPLY TO QUERY ────────────────────────────────────────────────
// exports.replyQuery = async (req, res) => {
//   try {
//     const { bankId, queryId } = req.params;
//     const { answer } = req.body;

//     const app = await LoanApplication.findById(req.params.id);
//     const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
//     const query = assignment?.queries?.id(queryId);
//     if (!query) return res.status(404).json({ message: 'Query not found' });

//     query.answer = answer;
//     query.status = 'resolved';
//     query.resolvedAt = new Date();
//     assignment.status = 'query_resolved';
//     assignment.statusHistory.push({
//       status: 'query_resolved',
//       changedBy: req.user._id,
//       changedByName: req.user.name,
//       changedAt: new Date(),
//       notes: answer
//     });
//     await app.save();

//     res.json({ message: 'Query resolved' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── UPLOAD DOCUMENT ──────────────────────────────────────────────────────────
// exports.uploadDocument = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
//     const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
//     const url = `${baseUrl}/uploads/${req.query.folder || 'others'}/${req.file.filename}`;
//     res.json({ url, filename: req.file.filename });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── GENERATE PDF ─────────────────────────────────────────────────────────────
// exports.generatePDF = async (req, res) => {
//   try {
//     const app = await LoanApplication.findById(req.params.id)
//       .populate('connectorId', 'name email')
//       .populate('companyId', 'companyName');
//     if (!app) return res.status(404).json({ message: 'Application not found' });

//     const doc = new PDFDocument({ margin: 50 });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=${app.applicationId}.pdf`);
//     doc.pipe(res);

//     doc.fontSize(20).fillColor('#1B4FD8').text('BANK ZONE', { align: 'center' });
//     doc.fontSize(12).fillColor('#333').text('Loan Marketplace & CRM Platform', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(14).fillColor('#000').text(`Application ID: ${app.applicationId}`, { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(12).text(`Loan Type: ${app.loanType}`);
//     doc.text(`Loan Amount: ₹${app.loanAmount?.toLocaleString('en-IN')}`);
//     doc.text(`Applicant: ${app.applicantDetails?.name || 'N/A'}`);
//     doc.text(`Mobile: ${app.applicantDetails?.mobileMasked || 'N/A'}`);
//     doc.text(`CIBIL Score: ${app.cibilScore || 'N/A'}`);
//     doc.text(`Status: ${app.overallStatus}`);
//     doc.text(`Selected Bank: ${app.selectedBankName || 'Not yet selected'}`);
//     doc.text(`Submitted: ${new Date(app.createdAt).toLocaleDateString('en-IN')}`);
//     doc.moveDown();
//     doc.fontSize(10).fillColor('#666').text(`Generated by BANK ZONE on ${new Date().toLocaleString('en-IN')}`, { align: 'center' });
//     doc.end();
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ─── NOTIFICATION DETAIL ──────────────────────────────────────────────────────
// exports.getNotificationDetail = async (req, res) => {
//   try {
//     const app = await LoanApplication.findById(req.params.id);
//     if (!app) return res.status(404).json({ message: 'Application not found' });

//     res.json({
//       applicationId: app.applicationId,
//       loanType: app.loanType,
//       loanAmount: app.loanAmount,
//       applicantName: app.applicantDetails?.name,
//       overallStatus: app.overallStatus,
//       bankAssignments: app.bankAssignments.map(ba => ({
//         bankName: ba.bankName,
//         status: ba.status,
//         interestStatus: ba.interestStatus,
//         interestNote: ba.interestNote,
//         rejectionReason: ba.rejectionReason,
//         sanctionAmount: ba.sanctionAmount,
//         disbursementAmount: ba.disbursementAmount,
//         disbursementDate: ba.disbursementDate,
//       }))
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };











const LoanApplication = require('../models/LoanApplication');
const Connector = require('../models/Connector');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const { sendNotification } = require('../utils/notifications');
const { applyMasking, maskMobile, maskEmail, maskAadhaar, maskPAN, maskDOB, maskName } = require('../utils/masking');
const { Commission } = require('../models/index');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { AuditLog } = require('../models/index');

const getMailer = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

const logAudit = async (userId, role, action, targetId, targetType, description, metadata = {}) => {
  try {
    await AuditLog.create({ userId, role, action, targetId, targetType, description, metadata });
  } catch (e) { console.error('Audit log error', e); }
};

// ─── CREATE APPLICATION ───────────────────────────────────────────────────────
// ─── CREATE APPLICATION ───────────────────────────────────────────────────────
exports.createApplication = async (req, res) => {
  try {
    console.log('🔍 ===== CREATE APPLICATION START =====');
    
    const connectorDoc = await Connector.findOne({ userId: req.user._id });
    if (!connectorDoc) {
      console.log('❌ Connector not found');
      return res.status(403).json({ message: 'Only connectors can submit applications' });
    }

    const approvedCompany = connectorDoc.companyRelations.find(r => r.status === 'approved');
    if (!approvedCompany) {
      console.log('❌ No approved company');
      return res.status(400).json({ message: 'You must be approved by a DSA company before submitting applications' });
    }


    //shree7
    const applicantDetails = req.body.applicantDetails || {};
const { bankIds, ...rest } = req.body;


    console.log('📌 Applicant Details:', JSON.stringify(applicantDetails, null, 2));
   
     console.log('📌 Documents received:', JSON.stringify(rest.documents, null, 2));

    if (!bankIds || bankIds.length === 0) {
      return res.status(400).json({ message: 'Please select at least one bank' });
    }

    // 🔥 FIX: Ensure DOB is properly handled (Date field)
    let dob = null;
    if (applicantDetails.dob) {
      dob = new Date(applicantDetails.dob);
      if (isNaN(dob.getTime())) {
        dob = null;
      }
    }

    // 🔥 Build applicantDetails matching the schema exactly
    const applicantData = {
      name: applicantDetails.name || '',
      nameMasked: maskName(applicantDetails.name || ''),
      mobile: applicantDetails.mobileRaw || applicantDetails.mobile || '',
      mobileMasked: maskMobile(applicantDetails.mobileRaw || applicantDetails.mobile || ''),
      email: applicantDetails.email || '',
      emailMasked: maskEmail(applicantDetails.email || ''),
      dob: dob,  // Date type
      dobMasked: maskDOB(applicantDetails.dob || ''),
      aadhaar: applicantDetails.aadhaarRaw || applicantDetails.aadhaar || '',
      aadhaarMasked: maskAadhaar(applicantDetails.aadhaarRaw || applicantDetails.aadhaar || ''),
      pan: applicantDetails.panRaw || applicantDetails.pan || '',
      panMasked: maskPAN(applicantDetails.panRaw || applicantDetails.pan || ''),
      presentAddress: applicantDetails.presentAddress || '',
      presentPincode: applicantDetails.presentPincode || '',
      presentProperty: applicantDetails.presentProperty || 'Rented',
      permanentAddress: applicantDetails.permanentAddress || '',
      permanentProperty: applicantDetails.permanentProperty || 'Owned',
      maritalStatus: applicantDetails.maritalStatus || 'Single',
      qualification: applicantDetails.qualification || '',
      motherName: applicantDetails.motherName || '',
      fatherName: applicantDetails.fatherName || '',
    };

    // 🔥 Validate required fields
    if (!applicantData.name) {
      return res.status(400).json({ message: 'Applicant name is required' });
    }
    if (!applicantData.mobile) {
      return res.status(400).json({ message: 'Mobile number is required' });
    }
    if (!applicantData.email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    if (!applicantData.aadhaar) {
      return res.status(400).json({ message: 'Aadhaar number is required' });
    }
    if (!applicantData.pan) {
      return res.status(400).json({ message: 'PAN number is required' });
    }

    console.log('📌 Applicant Data:', JSON.stringify(applicantData, null, 2));

    const selectedBanks = await Bank.find({ _id: { $in: bankIds } });
    console.log('📌 Selected Banks:', selectedBanks.length);

    // 🔥 Build bankAssignments matching the schema
    const bankAssignments = selectedBanks.map(bank => ({
      bankId: bank._id,
      bankName: bank.bankName,
      status: 'submitted',
      unmaskApproved: false,
      interestStatus: 'pending',
      interestNote: '',
      statusHistory: [{
        status: 'submitted',
        changedByName: req.user.name,
        changedAt: new Date(),
        notes: 'Masked lead submitted by connector'
      }],
      queries: [],
      documentDownloads: []
    }));

    // 🔥 Build incomeDetails
    const incomeDetails = rest.incomeDetails || {};
    
    // 🔥 Build the complete application object
    const applicationData = {
  connectorId: connectorDoc._id,
  companyId: approvedCompany.companyId,
  loanType: rest.loanType || 'Personal Loan',
  loanAmount: Number(rest.loanAmount) || 0,
  loanPurpose: rest.loanPurpose || 'New Loan',
  applicantDetails: applicantData,
  incomeDetails: {
    employmentType: incomeDetails.employmentType || 'Salaried',
    companyName: incomeDetails.companyName || '',
    companyCategory: incomeDetails.companyCategory || 'A',
    netSalaryMonth1: incomeDetails.netSalaryMonth1 ? Number(incomeDetails.netSalaryMonth1) : 0,
  netSalaryMonth2: incomeDetails.netSalaryMonth2 ? Number(incomeDetails.netSalaryMonth2) : 0,
  netSalaryMonth3: incomeDetails.netSalaryMonth3 ? Number(incomeDetails.netSalaryMonth3) : 0,
    grossSalary: incomeDetails.grossSalary ? Number(incomeDetails.grossSalary) : 0,
    salaryMode: incomeDetails.salaryMode || 'Account Transfer',
    designation: incomeDetails.designation || '',
    doj: incomeDetails.doj || '',
    totalExperience: incomeDetails.totalExperience || '',
    firmName: incomeDetails.firmName || '',
    companyType: incomeDetails.companyType || 'Proprietorship',
    natureOfBusiness: incomeDetails.natureOfBusiness || '',
    businessVintage: incomeDetails.businessVintage || '',
  },
  businessDetails: rest.businessDetails || {},
  propertyDetails: rest.propertyDetails || {},
  vehicleDetails: rest.vehicleDetails || {},
  existingLoans: rest.existingLoans || [],
  cibilScore: Number(rest.cibilScore) || 0,
  documents: rest.documents || {},   // ✅ FIXED — was hardcoded to {}
  bankAssignments: bankAssignments,
  selectedBankId: null,
  selectedBankName: null,
  selectedAt: null,
  overallStatus: 'active',
  maskHistory: [],
  coApplicants: [],
  recentEnquiries: []
};

    console.log('📌 Creating application...');
    const application = new LoanApplication(applicationData);
    await application.save();
    
    console.log('✅ Application created:', application._id);
    console.log('✅ Application ID:', application.applicationId);

    await Connector.findByIdAndUpdate(connectorDoc._id, { $inc: { totalLeads: 1 } });

    const company = await Company.findById(approvedCompany.companyId);
    if (company?.userId) {
      await sendNotification(company.userId, 'New Lead Created',
        `New ${rest.loanType} lead submitted by ${req.user.name}`, 'application', application._id);
    }

    await logAudit(req.user._id, req.user.role, 'create_lead', application._id, 'LoanApplication',
      `Connector ${req.user.name} created lead ${application.applicationId} and submitted to ${selectedBanks.length} bank(s)`,
      { bankIds, loanType: rest.loanType });

    console.log('🔍 ===== CREATE APPLICATION END =====');
    res.status(201).json(application);
    
  } catch (err) {
    console.error('❌ ERROR in createApplication:', err);
    console.error('❌ Stack trace:', err.stack);
    
    // 🔥 Check for validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: errors 
      });
    }
    
    res.status(500).json({ 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};




//shree

// ─── GET APPLICATIONS LIST ────────────────────────────────────────────────────
// ─── GET APPLICATIONS LIST ────────────────────────────────────────────────────
exports.getApplications = async (req, res) => {
  try {
    const { role, _id } = req.user;
    const { loanType, status, page = 1, limit = 20, search } = req.query;
    let query = {};

    if (role === 'connector') {
      const connector = await Connector.findOne({ userId: _id });
      if (connector) query.connectorId = connector._id;
    } else if (role === 'company') {
      const company = await Company.findOne({ userId: _id });
      if (company) query.companyId = company._id;
    } else if (role === 'bank' || role === 'sm') {
      let bankId;
      if (role === 'bank') {
        const bank = await Bank.findOne({ userId: _id });
        if (bank) bankId = bank._id;
      } else {
        const bank = await Bank.findOne({ 'salesManagers.smId': _id });
        if (bank) bankId = bank._id;
      }
      if (bankId) query['bankAssignments.bankId'] = bankId;
    }

    if (loanType) query.loanType = loanType;
    if (status) query.overallStatus = status;
    if (search) query['applicantDetails.name'] = { $regex: search, $options: 'i' };

    const apps = await LoanApplication.find(query)
      .populate('connectorId', 'name email mobile')
      .populate('companyId', 'companyName')
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await LoanApplication.countDocuments(query);

    let processedApps = apps;

    if (role === 'bank' || role === 'sm') {
      let bankId;
      if (role === 'bank') {
        const bank = await Bank.findOne({ userId: _id });
        if (bank) bankId = bank._id;
      } else {
        const bank = await Bank.findOne({ 'salesManagers.smId': _id });
        if (bank) bankId = bank._id;
      }

      console.log('🔍 ===== GET APPLICATIONS DEBUG =====');
      console.log('📌 Role:', role);
      console.log('📌 Bank ID:', bankId?.toString() || 'NULL');
      console.log('📌 Total Apps:', apps.length);

      // processedApps = apps.map((app, index) => {
      //   const assignment = app.bankAssignments?.find(ba => ba.bankId?.toString() === bankId?.toString());
        
      //   const isSelectedBank = app.selectedBankId?.toString() === bankId?.toString();
      //   const isUnmaskApproved = assignment?.unmaskApproved === true;
        
      //   console.log(`📌 App ${index + 1}: ${app.applicationId}`);
      //   console.log(`   - selectedBankId: ${app.selectedBankId?.toString() || 'NULL'}`);
      //   console.log(`   - Is Selected: ${isSelectedBank}`);
      //   console.log(`   - unmaskApproved: ${isUnmaskApproved}`);
      //   console.log(`   - Returning: ${isSelectedBank && isUnmaskApproved ? '✅ UNMASKED' : '❌ MASKED'}`);
        
      //   if (isSelectedBank && isUnmaskApproved) {
      //     return app.toObject();
      //   }
      //   return applyMasking(app);
      // });








      processedApps = apps.map((app, index) => {
        const assignment = app.bankAssignments?.find(ba => ba.bankId?.toString() === bankId?.toString());
        
        const isSelectedBank = app.selectedBankId?.toString() === bankId?.toString();
        const isUnmaskApproved = assignment?.unmaskApproved === true;
        
        console.log(`📌 App ${index + 1}: ${app.applicationId}`);
        console.log(`   - selectedBankId: ${app.selectedBankId?.toString() || 'NULL'}`);
        console.log(`   - Is Selected: ${isSelectedBank}`);
        console.log(`   - unmaskApproved: ${isUnmaskApproved}`);
        console.log(`   - Returning: ${isSelectedBank && isUnmaskApproved ? '✅ UNMASKED' : '❌ MASKED'}`);
        
        const result = (isSelectedBank && isUnmaskApproved) ? app.toObject() : applyMasking(app);

        // ✅ FIX: this bank should only ever see its OWN assignment, not other banks'
        result.bankAssignments = (result.bankAssignments || []).filter(
          ba => ba.bankId?.toString() === bankId?.toString()
        );

        return result;
      });


      console.log('🔍 ===== DEBUG END =====');
    } else if (role === 'company') {
      processedApps = apps.map(app => app.toObject());
    }

    res.json({ applications: processedApps, total, pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    console.error('Error in getApplications:', err);
    res.status(500).json({ message: err.message });
  }
};




//shree

// ─── GET APPLICATION BY ID ────────────────────────────────────────────────────
exports.getApplicationById = async (req, res) => {
  try {
    const { role, _id } = req.user;
    const app = await LoanApplication.findById(req.params.id)
      .populate('connectorId', 'name email mobile')
      .populate('companyId', 'companyName email');

    if (!app) return res.status(404).json({ message: 'Application not found' });

    // Admin sees everything
    if (role === 'admin') return res.json(app);

    // Connector sees their own application fully
    if (role === 'connector') {
      const connector = await Connector.findOne({ userId: _id });
      if (!connector || app.connectorId?._id?.toString() !== connector._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      return res.json(app);
    }

    // Bank / SM: only unmasked if selected
    if (role === 'bank' || role === 'sm') {
      let bankId;
      if (role === 'bank') {
        const bank = await Bank.findOne({ userId: _id });
        if (bank) bankId = bank._id;
      } else {
        const bank = await Bank.findOne({ 'salesManagers.smId': _id });
        if (bank) bankId = bank._id;
      }

      if (!bankId) {
        return res.status(403).json({ message: 'Bank profile not found' });
      }

      const assignment = app.bankAssignments.find(ba => {
        return ba.bankId && ba.bankId.toString() === bankId.toString();
      });
      
      if (!assignment) {
        return res.status(403).json({ message: 'Access denied - Application not assigned to your bank' });
      }

      // 🔥 DEBUG LOGS
      console.log('🔍 ===== DEBUG START =====');
      console.log('📌 Bank ID:', bankId.toString());
      console.log('📌 Selected Bank ID:', app.selectedBankId?.toString() || 'NULL');
      console.log('📌 Is Selected:', app.selectedBankId?.toString() === bankId.toString());
      console.log('📌 unmaskApproved:', assignment.unmaskApproved);
      
      // ✅ Check if this bank is SELECTED and UNMASK APPROVED
      const isSelectedBank = app.selectedBankId && app.selectedBankId.toString() === bankId.toString();
      const isUnmaskApproved = assignment.unmaskApproved === true;
      const shouldUnmask = isSelectedBank && isUnmaskApproved;
      
      console.log('📌 Should Unmask:', shouldUnmask);
      console.log('📌 Returning:', shouldUnmask ? '✅ UNMASKED' : '❌ MASKED');
      
      // 🔥 Print the actual data being returned
      if (shouldUnmask) {
        console.log('📌 Mobile (unmasked):', app.applicantDetails?.mobile);
        console.log('📌 PAN (unmasked):', app.applicantDetails?.pan);
        console.log('📌 Aadhaar (unmasked):', app.applicantDetails?.aadhaar);
      }
     console.log('🔍 ===== DEBUG END =====');

      // ✅ Only show unmasked data if:
      // 1. This bank IS the selected bank
      // 2. This bank has unmaskApproved = true
      const result = shouldUnmask ? app.toObject() : applyMasking(app);

      // ✅ FIX: this bank should only ever see its OWN assignment, not other banks'
      result.bankAssignments = (result.bankAssignments || []).filter(
        ba => ba.bankId && ba.bankId.toString() === bankId.toString()
      );

      return res.json(result);
    }

    // Corporate DSA: full visibility
    if (role === 'company') {
      const company = await Company.findOne({ userId: _id });
      if (!company || app.companyId?._id?.toString() !== company._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      return res.json(app);
    }

    res.json(app);
  } catch (err) {
    console.error('Error in getApplicationById:', err);
    res.status(500).json({ message: err.message });
  }
};

// ─── BANKER: UPDATE INTEREST STATUS ──────────────────────────────────────────
exports.updateInterestStatus = async (req, res) => {
  try {
    const { bankId } = req.params;
    const { interestStatus, interestNote } = req.body;

    const validStatuses = ['interested', 'not_interested', 'need_more_info'];
    if (!validStatuses.includes(interestStatus)) {
      return res.status(400).json({ message: 'interestStatus must be: interested, not_interested, or need_more_info' });
    }

    const app = await LoanApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.interestStatus = interestStatus;
    assignment.interestNote = interestNote || '';
    assignment.interestUpdatedAt = new Date();
    await app.save();

    // Notify connector
    const connector = await Connector.findById(app.connectorId);
    if (connector?.userId) {
      await sendNotification(connector.userId, 'Bank Response Received',
        `${assignment.bankName} responded: ${interestStatus.replace(/_/g, ' ').toUpperCase()} for ${app.applicationId}`,
        'stage_update', app._id);
    }

    await logAudit(req.user._id, req.user.role, 'interest_status_update', app._id, 'LoanApplication',
      `${req.user.name} (${assignment.bankName}) updated interest to ${interestStatus} for ${app.applicationId}`,
      { bankId, interestStatus, interestNote });

    res.json({ message: 'Interest status updated', assignment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




//shree


// ─── CONNECTOR: SELECT PREFERRED BANK ────────────────────────────────────────
exports.selectBank = async (req, res) => {
  try {
    console.log('🔍 ===== SELECT BANK START =====');
    const { bankId } = req.params;
    console.log('📌 Bank ID to select:', bankId);

    const app = await LoanApplication.findById(req.params.id);
    if (!app) {
      console.log('❌ Application not found');
      return res.status(404).json({ message: 'Application not found' });
    }
    console.log('📌 Application ID:', app.applicationId);
    console.log('📌 Current selectedBankId:', app.selectedBankId);
    console.log('📌 Current selectedBankName:', app.selectedBankName);

    const connector = await Connector.findOne({ userId: req.user._id });
    if (!connector || app.connectorId?.toString() !== connector._id.toString()) {
      console.log('❌ Only connector can select bank');
      return res.status(403).json({ message: 'Only the submitting connector can select a bank' });
    }

    if (app.selectedBankId) {
      console.log('❌ Bank already selected');
      return res.status(400).json({ message: `Bank already selected: ${app.selectedBankName}` });
    }

    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) {
      console.log('❌ Bank not assigned');
      return res.status(404).json({ message: 'Bank not assigned to this application' });
    }
    console.log('📌 Bank Name:', assignment.bankName);
    console.log('📌 Interest Status:', assignment.interestStatus);
    console.log('📌 Current unmaskApproved:', assignment.unmaskApproved);

    if (assignment.interestStatus !== 'interested') {
      console.log('❌ Bank not interested');
      return res.status(400).json({ 
        message: `Cannot select ${assignment.bankName}. They ${assignment.interestStatus === 'not_interested' ? 'declined' : 'haven\'t responded yet'}.` 
      });
    }

    // ✅ SET selected bank and unmask approval
    app.selectedBankId = assignment.bankId;
    app.selectedBankName = assignment.bankName;
    app.selectedAt = new Date();
    assignment.unmaskApproved = true;
    assignment.unmaskApprovedAt = new Date();

    app.maskHistory.push({
      action: 'unmasked',
      performedBy: req.user._id,
      performedByName: req.user.name,
      bankId: assignment.bankId,
      bankName: assignment.bankName,
      performedAt: new Date()
    });

    await app.save();
    console.log('✅ Application saved successfully');

    // 🔥 Verify after save
    const savedApp = await LoanApplication.findById(req.params.id);
    console.log('📌 AFTER SAVE - selectedBankId:', savedApp.selectedBankId);
    console.log('📌 AFTER SAVE - selectedBankName:', savedApp.selectedBankName);
    
    const savedAssignment = savedApp.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    console.log('📌 AFTER SAVE - unmaskApproved:', savedAssignment?.unmaskApproved);
    console.log('📌 AFTER SAVE - Mobile:', savedApp.applicantDetails?.mobile);
    console.log('📌 AFTER SAVE - PAN:', savedApp.applicantDetails?.pan);
    console.log('📌 AFTER SAVE - Aadhaar:', savedApp.applicantDetails?.aadhaar);
    console.log('🔍 ===== SELECT BANK END =====');

    // Notify selected bank
    const bank = await Bank.findById(bankId);
    if (bank?.userId) {
      await sendNotification(bank.userId, 'You Have Been Selected!',
        `Connector selected your bank for ${app.applicationId}. Customer details are now fully visible.`,
        'unmask', app._id);
    }

    const company = await Company.findById(app.companyId);
    if (company?.userId) {
      await sendNotification(company.userId, 'Bank Selected',
        `${req.user.name} selected ${assignment.bankName} for ${app.applicationId}`,
        'application', app._id);
    }

    await logAudit(req.user._id, req.user.role, 'bank_selected', app._id, 'LoanApplication',
      `Connector ${req.user.name} selected ${assignment.bankName} for ${app.applicationId}`,
      { bankId, bankName: assignment.bankName });

    res.json({ 
      message: `${assignment.bankName} selected. Customer details are now unmasked for this bank.`, 
      application: app 
    });
  } catch (err) {
    console.error('❌ Error in selectBank:', err);
    res.status(500).json({ message: err.message });
  }
};



// ─── SELECTED BANKER: DOWNLOAD DOCUMENTS & EMAIL ────────────────────────────
// ─── SELECTED BANKER: DOWNLOAD DOCUMENTS ────────────────────────────
exports.downloadAndEmailDocs = async (req, res) => {
  try {
    const { bankId } = req.params;
    const app = await LoanApplication.findById(req.params.id)
      .populate('connectorId', 'name email')
      .populate('companyId', 'companyName');
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    // ✅ Only selected bank with unmask approval can download
    if (!assignment.unmaskApproved || app.selectedBankId?.toString() !== bankId) {
      return res.status(403).json({
        message: 'Documents are only available after the connector selects your bank'
      });
    }

    const docs = app.documents || {};
    const docList = [];
    if (docs.panCard?.url) docList.push({ name: 'PAN Card', url: docs.panCard.url });
    if (docs.aadhaarCard?.url) docList.push({ name: 'Aadhaar Card', url: docs.aadhaarCard.url });
    if (docs.photo?.url) docList.push({ name: 'Photo', url: docs.photo.url });
    if (docs.form16?.url) docList.push({ name: 'Form 16', url: docs.form16.url });
    if (docs.saleDeed?.url) docList.push({ name: 'Sale Deed', url: docs.saleDeed.url });
    (docs.payslips || []).forEach((p, i) => p.url && docList.push({ name: `Payslip ${i + 1}`, url: p.url }));
    (docs.bankStatements || []).forEach((s, i) => s.url && docList.push({ name: `Bank Statement ${i + 1}`, url: s.url }));
    (docs.propertyDocs || []).forEach(d => d.url && docList.push({ name: d.name || 'Property Doc', url: d.url }));
    (docs.others || []).forEach(d => d.url && docList.push({ name: d.name || 'Other', url: d.url }));

    // Log each document download (kept — good for audit trail)
    docList.forEach(d => {
      assignment.documentDownloads.push({
        downloadedBy: req.user.name,
        downloadedByUserId: req.user._id,
        fileName: d.name,
        downloadedAt: new Date()
      });
    });
    await app.save();

    await logAudit(req.user._id, req.user.role, 'document_download', app._id, 'LoanApplication',
      `${req.user.name} (${assignment.bankName}) downloaded ${docList.length} document(s) for ${app.applicationId}`,
      { bankId, docCount: docList.length });

    // ✅ No email — just return the list, frontend downloads directly
    res.json({ message: 'Documents retrieved', documents: docList });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── BANKER: UPDATE LOAN STATUS ──────────────────────────────────────────────
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { bankId } = req.params;
    const { status, notes, sanctionAmount, sanctionDate, sanctionLetterUrl,
      disbursementAmount, disbursementDate, disbursementAccount, rejectionReason } = req.body;

    const app = await LoanApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Bank assignment not found' });

    // ✅ Only selected bank can update loan processing status
    if (!app.selectedBankId || app.selectedBankId?.toString() !== bankId) {
      return res.status(403).json({ 
        message: `Only the selected bank (${app.selectedBankName || 'None'}) can update loan processing status` 
      });
    }

    const prevStatus = assignment.status;
    assignment.status = status;
    assignment.statusHistory.push({
      status,
      changedBy: req.user._id,
      changedByName: req.user.name,
      changedAt: new Date(),
      notes
    });

    if (sanctionAmount) assignment.sanctionAmount = sanctionAmount;
    if (sanctionDate) assignment.sanctionDate = sanctionDate;
    if (sanctionLetterUrl) assignment.sanctionLetterUrl = sanctionLetterUrl;
    if (disbursementAmount) assignment.disbursementAmount = disbursementAmount;
    if (disbursementDate) assignment.disbursementDate = disbursementDate;
    if (disbursementAccount) assignment.disbursementAccount = disbursementAccount;
    if (rejectionReason) assignment.rejectionReason = rejectionReason;

    // Update overall status
    app.overallStatus = status;
    await app.save();

    // Notify connector
    const connector = await Connector.findById(app.connectorId);
    if (connector?.userId) {
      await sendNotification(connector.userId, 'Loan Status Update',
        `${assignment.bankName}: ${status.replace(/_/g, ' ').toUpperCase()}`, 'stage_update', app._id);
    }

    // Auto commission on disbursement
    if (status === 'disbursed' && disbursementAmount) {
      const commissionRate = 1.5;
      const commissionAmount = (disbursementAmount * commissionRate) / 100;
      await Commission.create({
        connectorId: app.connectorId,
        applicationId: app._id,
        loanType: app.loanType,
        loanAmount: disbursementAmount,
        commissionRate,
        commissionAmount
      });
      if (connector?.userId) {
        await sendNotification(connector.userId, 'Commission Credited',
          `Commission of ₹${commissionAmount.toLocaleString('en-IN')} credited for ${app.applicationId}`,
          'commission', app._id);
      }
    }

    await logAudit(req.user._id, req.user.role, 'status_update', app._id, 'LoanApplication',
      `${req.user.name} updated status from ${prevStatus} to ${status} for ${app.applicationId}`,
      { bankId, prevStatus, newStatus: status });

    res.json({ message: 'Status updated', assignment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── BANKER: RAISE QUERY ──────────────────────────────────────────────────────
exports.raiseQuery = async (req, res) => {
  try {
    const { bankId } = req.params;
    const { question } = req.body;

    const app = await LoanApplication.findById(req.params.id);
    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.queries.push({
      raisedBy: req.user._id,
      raisedByName: req.user.name,
      question,
      status: 'pending'
    });
    assignment.status = 'query_raised';
    assignment.statusHistory.push({
      status: 'query_raised',
      changedBy: req.user._id,
      changedByName: req.user.name,
      changedAt: new Date(),
      notes: question
    });
    await app.save();

    const connector = await Connector.findById(app.connectorId);
    if (connector?.userId) {
      await sendNotification(connector.userId, 'Query Raised',
        `${assignment.bankName} raised a query on ${app.applicationId}`, 'query', app._id);
    }

    res.json({ message: 'Query raised' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── CONNECTOR: REPLY TO QUERY ────────────────────────────────────────────────
exports.replyQuery = async (req, res) => {
  try {
    const { bankId, queryId } = req.params;
    const { answer } = req.body;

    const app = await LoanApplication.findById(req.params.id);
    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    const query = assignment?.queries?.id(queryId);
    if (!query) return res.status(404).json({ message: 'Query not found' });

    query.answer = answer;
    query.status = 'resolved';
    query.resolvedAt = new Date();
    assignment.status = 'query_resolved';
    assignment.statusHistory.push({
      status: 'query_resolved',
      changedBy: req.user._id,
      changedByName: req.user.name,
      changedAt: new Date(),
      notes: answer
    });
    await app.save();

    res.json({ message: 'Query resolved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── UPLOAD DOCUMENT ──────────────────────────────────────────────────────────
exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
    const url = `${baseUrl}/uploads/${req.query.folder || 'others'}/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── GENERATE PDF ─────────────────────────────────────────────────────────────
exports.generatePDF = async (req, res) => {
  try {
    const app = await LoanApplication.findById(req.params.id)
      .populate('connectorId', 'name email')
      .populate('companyId', 'companyName');
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${app.applicationId}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).fillColor('#1B4FD8').text('BANK ZONE', { align: 'center' });
    doc.fontSize(12).fillColor('#333').text('Loan Marketplace & CRM Platform', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).fillColor('#000').text(`Application ID: ${app.applicationId}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Loan Type: ${app.loanType}`);
    doc.text(`Loan Amount: ₹${app.loanAmount?.toLocaleString('en-IN')}`);
    doc.text(`Applicant: ${app.applicantDetails?.name || 'N/A'}`);
    doc.text(`Mobile: ${app.applicantDetails?.mobileMasked || 'N/A'}`);
    doc.text(`CIBIL Score: ${app.cibilScore || 'N/A'}`);
    doc.text(`Status: ${app.overallStatus}`);
    doc.text(`Selected Bank: ${app.selectedBankName || 'Not yet selected'}`);
    doc.text(`Submitted: ${new Date(app.createdAt).toLocaleDateString('en-IN')}`);
    doc.moveDown();
    doc.fontSize(10).fillColor('#666').text(`Generated by BANK ZONE on ${new Date().toLocaleString('en-IN')}`, { align: 'center' });
    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── NOTIFICATION DETAIL ──────────────────────────────────────────────────────
exports.getNotificationDetail = async (req, res) => {
  try {
    const app = await LoanApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    res.json({
      applicationId: app.applicationId,
      loanType: app.loanType,
      loanAmount: app.loanAmount,
      applicantName: app.applicantDetails?.name,
      overallStatus: app.overallStatus,
      bankAssignments: app.bankAssignments.map(ba => ({
        bankName: ba.bankName,
        status: ba.status,
        interestStatus: ba.interestStatus,
        interestNote: ba.interestNote,
        rejectionReason: ba.rejectionReason,
        sanctionAmount: ba.sanctionAmount,
        disbursementAmount: ba.disbursementAmount,
        disbursementDate: ba.disbursementDate,
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};