const mongoose = require('mongoose');

const existingLoanSchema = new mongoose.Schema({
  loanType: String, bankName: String, loanAmount: Number, emi: Number, sanctionDate: String,
  hasDelay: Boolean, delayDetails: { loanType: String, months: String, days: Number },
  hasSettlement: Boolean, settlementDetails: { loanType: String, overdueAmount: Number, paidAmount: Number, pendingAmount: Number },
});

const leadV2Schema = new mongoose.Schema({
  connectorId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerName:   { type: String, required: true },
  customerMobile: { type: String, required: true },
  loanType:       { type: String, required: true },
  isBalanceTransfer: { type: Boolean, default: false },
  altMobile: String, email: String, officialEmail: String,
  motherName: String, fatherName: String, maritalStatus: String, qualification: String,
  aadhaarNumber: String, panNumber: String,
  presentAddress: String, presentPincode: String, presentOwnership: String, yearsAtPresent: Number,
  permanentAddress: String, permanentOwnership: String, yearsAtPermanent: Number,
  employmentType: { type: String, enum: ['salaried', 'self-employed'] },
  companyName: String, netSalary: Number, salaryMode: String, designation: String,
  companyDOJ: String, prevCompanyDOJ: String, prevRelievingDate: String,
  hasRelievingLetter: Boolean, companyAddress: String, totalExperience: Number,
  firmName: String, companyType: String, businessAddress: String, natureOfBusiness: String,
  hasGST: Boolean, hasLabourLicense: Boolean, hasMSME: Boolean, hasUDYAM: Boolean,
  businessRegDate: String, itrFiled: Boolean,
  itrDetails: [{ year: String, netIncome: Number, turnover: Number }],
  existingLoans: [existingLoanSchema],
  cibilScore: Number,
  appliedRecently: Boolean, recentBanks: [String], recentMonth: String,
  documents: {
    panCard: String, aadhaarCard: String,
    payslip1: String, payslip2: String, payslip3: String,
    bankStatement1: String, bankStatement2: String, bankStatement3: String,
    photo: String, form16: String, form26as: String, pfStatement: String,
  },
  selectedBanks:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' }],
  assignedBankers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  overallStatus: {
    type: String,
    enum: ['submitted', 'processing', 'sanctioned', 'rejected', 'disbursed', 'closed'],
    default: 'submitted'
  },
  bankStatuses: [{
    bankId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
    bankerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status:   { type: String, default: 'pending' },
    stage:    { type: String, default: 'Lead Received' },
    sanctionLetterPath: String,
    disbursedAmount: Number,
    disbursedDate: Date,
  }],
  submittedAt:     { type: Date, default: Date.now },
  firstResponseAt: Date,
  sanctionedAt:    Date,
  disbursedAt:     Date,
}, { timestamps: true });

module.exports = mongoose.model('LeadV2', leadV2Schema);
