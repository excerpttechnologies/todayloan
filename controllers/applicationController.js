const LoanApplication = require('../models/LoanApplication');
const Connector = require('../models/Connector');
const Company = require('../models/Company');
const Bank = require('../models/Bank');
const { sendNotification } = require('../utils/notifications');
const { applyMasking, maskMobile, maskEmail, maskAadhaar, maskPAN, maskDOB } = require('../utils/masking');
const { Commission } = require('../models/index');
const PDFDocument = require('pdfkit');

exports.createApplication = async (req, res) => {
  try {
    const connectorDoc = await Connector.findOne({ userId: req.user._id });
    if (!connectorDoc) return res.status(403).json({ message: 'Only connectors can submit applications' });

    const approvedCompany = connectorDoc.companyRelations.find(r => r.status === 'approved');
    if (!approvedCompany) return res.status(400).json({ message: 'You must be approved by a DSA company before submitting applications' });

    const { applicantDetails, bankIds, ...rest } = req.body;

    const masked = {
      ...applicantDetails,
      mobileMasked: maskMobile(applicantDetails.mobileRaw || applicantDetails.mobile),
      emailMasked: maskEmail(applicantDetails.email),
      aadhaarMasked: maskAadhaar(applicantDetails.aadhaarRaw),
      panMasked: maskPAN(applicantDetails.panRaw),
      dobMasked: maskDOB(applicantDetails.dob),
    };

    const selectedBanks = await Bank.find({ _id: { $in: bankIds } });

    const bankAssignments = selectedBanks.map(bank => ({
      bankId: bank._id,
      bankName: bank.bankName,
      status: 'submitted',
      statusHistory: [{ status: 'submitted', changedByName: req.user.name, changedAt: new Date(), notes: 'Application submitted' }]
    }));

    const application = await LoanApplication.create({
      ...rest,
      connectorId: connectorDoc._id,
      companyId: approvedCompany.companyId,
      applicantDetails: masked,
      bankAssignments
    });

    await Connector.findByIdAndUpdate(connectorDoc._id, { $inc: { totalLeads: 1 } });

    // Notify company
    const company = await Company.findById(approvedCompany.companyId);
    if (company?.userId) {
      await sendNotification(company.userId, 'New Application', `New ${rest.loanType} application submitted by ${req.user.name}`, 'application', application._id);
    }

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

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
    if (search) query['applicantDetails.name'] = { $regex: search, $options: 'i' };

    const apps = await LoanApplication.find(query)
      .populate('connectorId', 'name email mobile')
      .populate('companyId', 'companyName')
      .sort({ createdAt: -1 })
      .skip((page-1)*Number(limit))
      .limit(Number(limit));

    const total = await LoanApplication.countDocuments(query);

    // Apply masking for bank/sm/company roles
    let processedApps = apps;
    if (role === 'bank' || role === 'sm' || role === 'company') {
      processedApps = apps.map(app => {
        const bankAssignment = app.bankAssignments?.find(ba => 
          role === 'company' ? true : ba.bankId?.toString() === req.query.bankId
        );
        if (bankAssignment?.unmaskApproved) return app.toObject();
        return applyMasking(app);
      });
    }

    res.json({ applications: processedApps, total, pages: Math.ceil(total/Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    const { role, _id } = req.user;
    const app = await LoanApplication.findById(req.params.id)
      .populate('connectorId', 'name email mobile')
      .populate('companyId', 'companyName email');

    if (!app) return res.status(404).json({ message: 'Application not found' });

    if (role === 'admin') return res.json(app);

    if (role === 'connector') {
      const connector = await Connector.findOne({ userId: _id });
      if (!connector || app.connectorId?._id?.toString() !== connector._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      return res.json(app);
    }

    if (role === 'bank' || role === 'sm') {
      let bankId;
      if (role === 'bank') {
        const bank = await Bank.findOne({ userId: _id });
        bankId = bank?._id;
      } else {
        const bank = await Bank.findOne({ 'salesManagers.smId': _id });
        bankId = bank?._id;
      }
      const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId?.toString());
      if (!assignment) return res.status(403).json({ message: 'Access denied' });
      
      if (assignment.unmaskApproved) return res.json(app);
      return res.json(applyMasking(app));
    }

    if (role === 'company') {
      const company = await Company.findOne({ userId: _id });
      if (!company || app.companyId?._id?.toString() !== company._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
      }
      return res.json(app);
    }

    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { bankId } = req.params;
    const { status, notes, sanctionAmount, sanctionDate, sanctionLetterUrl, disbursementAmount, disbursementDate, disbursementAccount, rejectionReason } = req.body;

    const app = await LoanApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Bank assignment not found' });

    const prevStatus = assignment.status;
    assignment.status = status;
    assignment.statusHistory.push({ status, changedBy: req.user._id, changedByName: req.user.name, changedAt: new Date(), notes });

    if (sanctionAmount) assignment.sanctionAmount = sanctionAmount;
    if (sanctionDate) assignment.sanctionDate = sanctionDate;
    if (sanctionLetterUrl) assignment.sanctionLetterUrl = sanctionLetterUrl;
    if (disbursementAmount) assignment.disbursementAmount = disbursementAmount;
    if (disbursementDate) assignment.disbursementDate = disbursementDate;
    if (disbursementAccount) assignment.disbursementAccount = disbursementAccount;
    if (rejectionReason) assignment.rejectionReason = rejectionReason;

    await app.save();

    // Notify connector
    const connector = await Connector.findById(app.connectorId);
    if (connector?.userId) {
      await sendNotification(connector.userId, 'Application Status Update', `${assignment.bankName}: ${status.replace(/_/g,' ').toUpperCase()}`, 'stage_update', app._id);
    }

    if (status === 'disbursement' && disbursementAmount) {
      const commissionRate = 1.5;
      const commissionAmount = (disbursementAmount * commissionRate) / 100;
      await Commission.create({ connectorId: app.connectorId, applicationId: app._id, loanType: app.loanType, loanAmount: disbursementAmount, commissionRate, commissionAmount });
      if (connector?.userId) {
        await sendNotification(connector.userId, 'Commission Credited', `Commission of ₹${commissionAmount.toLocaleString('en-IN')} credited for ${app.applicationId}`, 'commission', app._id);
      }
    }

    res.json({ message: 'Status updated', assignment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.raiseQuery = async (req, res) => {
  try {
    const { bankId } = req.params;
    const { question } = req.body;
    
    const app = await LoanApplication.findById(req.params.id);
    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.queries.push({ raisedBy: req.user._id, raisedByName: req.user.name, question, status: 'pending' });
    assignment.status = 'query_raised';
    assignment.statusHistory.push({ status: 'query_raised', changedBy: req.user._id, changedByName: req.user.name, changedAt: new Date(), notes: question });
    await app.save();

    const connector = await Connector.findById(app.connectorId);
    if (connector?.userId) {
      await sendNotification(connector.userId, 'Query Raised', `${assignment.bankName} raised a query on ${app.applicationId}`, 'query', app._id);
    }

    res.json({ message: 'Query raised' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    assignment.statusHistory.push({ status: 'query_resolved', changedBy: req.user._id, changedByName: req.user.name, changedAt: new Date(), notes: answer });
    await app.save();

    res.json({ message: 'Query resolved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.requestUnmask = async (req, res) => {
  try {
    const { bankId } = req.params;
    const app = await LoanApplication.findById(req.params.id);
    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    if (!assignment.unmaskRequested) {
      assignment.unmaskRequested = true;
      await app.save();
      const connector = await Connector.findById(app.connectorId);
      if (connector?.userId) {
        await sendNotification(connector.userId, 'Unmask Request', `${assignment.bankName} wants to unmask your client details for ${app.applicationId}`, 'unmask', app._id);
      }
    }
    res.json({ message: 'Unmask request sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.approveUnmask = async (req, res) => {
  try {
    const { bankId } = req.params;
    const app = await LoanApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const connector = await Connector.findOne({ userId: req.user._id });
    if (!connector || app.connectorId?.toString() !== connector._id.toString()) {
      return res.status(403).json({ message: 'Only the submitting connector can approve unmasking' });
    }

    const assignment = app.bankAssignments.find(ba => ba.bankId?.toString() === bankId);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    assignment.unmaskApproved = true;
    assignment.unmaskApprovedAt = new Date();
    await app.save();

    const bank = await Bank.findById(bankId);
    if (bank?.userId) {
      await sendNotification(bank.userId, 'Unmasking Approved', `Connector approved unmasking for ${app.applicationId}`, 'unmask', app._id);
    }

    res.json({ message: 'Unmasking approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.query.folder || 'others'}/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    doc.text(`Submitted: ${new Date(app.createdAt).toLocaleDateString('en-IN')}`);
    doc.moveDown();
    doc.fontSize(10).fillColor('#666').text(`Generated by BANK ZONE on ${new Date().toLocaleString('en-IN')}`, { align: 'center' });
    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
