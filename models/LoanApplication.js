// // const mongoose = require('mongoose');

// // const querySchema = new mongoose.Schema({
// //   raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //   raisedByName: String,
// //   question: String,
// //   answer: String,
// //   status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
// //   raisedAt: { type: Date, default: Date.now },
// //   resolvedAt: Date
// // });

// // const statusHistorySchema = new mongoose.Schema({
// //   status: String,
// //   changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //   changedByName: String,
// //   changedAt: { type: Date, default: Date.now },
// //   notes: String
// // });

// // const bankAssignmentSchema = new mongoose.Schema({
// //   bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
// //   bankName: String,
// //   smId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
// //   smName: String,
// //   status: {
// //     type: String,
// //     enum: ['submitted','under_review','accepted','login','verification','credit_review','query_raised','query_resolved','sanctioned','agreement','disbursement','closed','rejected','on_hold'],
// //     default: 'submitted'
// //   },
// //   unmaskRequested: { type: Boolean, default: false },
// //   unmaskApproved: { type: Boolean, default: false },
// //   unmaskApprovedAt: Date,
// //   sanctionAmount: Number,
// //   sanctionDate: Date,
// //   sanctionLetterUrl: String,
// //   disbursementAmount: Number,
// //   disbursementDate: Date,
// //   disbursementAccount: String,
// //   rejectionReason: String,
// //   tatBreached: { type: Boolean, default: false },
// //   statusHistory: [statusHistorySchema],
// //   queries: [querySchema],
// //   interestStatus: { type: String, enum: ['pending', 'interested', 'not_interested', 'need_more_info'], default: 'pending' },
// //   interestNote: String,
// //   interestUpdatedAt: Date,
// //   documentDownloads: [{ downloadedBy: String, downloadedAt: { type: Date, default: Date.now }, fileName: String }],
// //   emailSentAt: Date

// // });

// // const loanApplicationSchema = new mongoose.Schema({
// //   applicationId: { type: String, unique: true },
// //   connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Connector' },
// //   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
// //   loanType: { type: String, required: true },
// //   loanAmount: { type: Number },
// //   loanPurpose: { type: String },
// //   applicantDetails: {
// //     name: String,
// //     mobileRaw: String,
// //     mobileMasked: String,
// //     email: String,
// //     emailMasked: String,
// //     dob: Date,
// //     dobMasked: String,
// //     aadhaarRaw: String,
// //     aadhaarMasked: String,
// //     panRaw: String,
// //     panMasked: String,
// //     presentAddress: String,
// //     presentPincode: String,
// //     presentProperty: String,
// //     permanentAddress: String,
// //     permanentProperty: String,
// //     maritalStatus: String,
// //     qualification: String,
// //     motherName: String,
// //     fatherName: String,
// //     gender: String,
// //     birthPlace: String
// //   },
// //   incomeDetails: {
// //     employmentType: String,
// //     companyName: String,
// //     companyCategory: String,
// //     netSalary: Number,
// //     grossSalary: Number,
// //     salaryMode: String,
// //     designation: String,
// //     doj: String,
// //     totalExperience: Number,
// //     previousCompany: String,
// //     annualTurnover: Number,
// //     businessVintage: Number
// //   },
// //   existingLoans: [{
// //     loanType: String,
// //     bankName: String,
// //     loanAmount: Number,
// //     emiAmount: Number,
// //     sanctionDate: Date,
// //     outstandingBalance: Number,
// //     delayPayments: Boolean,
// //     settlements: Boolean
// //   }],
// //   cibilScore: Number,
// //   recentEnquiries: [{ bankName: String, month: String }],
// //   businessDetails: {
// //     firmName: String,
// //     companyType: String,
// //     businessAddress: String,
// //     businessPincode: String,
// //     natureOfBusiness: String,
// //     registrationDate: String,
// //     gstNumber: String,
// //     msmeNumber: String,
// //     itrFiled: Boolean,
// //     itrData: [{
// //       year: String,
// //       netIncome: Number,
// //       turnover: Number
// //     }]
// //   },
// //   propertyDetails: {
// //     propertyAddress: String,
// //     propertyPincode: String,
// //     propertyType: String,
// //     khataType: String,
// //     propertyAge: Number,
// //     builtUpArea: Number,
// //     srValue: Number,
// //     marketValue: Number,
// //     rentalIncome: Number
// //   },
// //   vehicleDetails: {
// //     make: String,
// //     model: String,
// //     variant: String,
// //     year: Number,
// //     isNew: Boolean,
// //     dealerName: String,
// //     exShowroomPrice: Number,
// //     onRoadPrice: Number,
// //     downPayment: Number
// //   },
// //   coApplicants: [{
// //     name: String,
// //     mobile: String,
// //     email: String,
// //     relationship: String,
// //     income: Number,
// //     incomeType: String
// //   }],
// //   documents: {
// //     panCard: { url: String, uploadedAt: Date },
// //     aadhaarCard: { url: String, uploadedAt: Date },
// //     payslips: [{ url: String, uploadedAt: Date }],
// //     bankStatements: [{ url: String, uploadedAt: Date }],
// //     photo: { url: String, uploadedAt: Date },
// //     form16: { url: String, uploadedAt: Date },
// //     saleDeed: { url: String, uploadedAt: Date },
// //     propertyDocs: [{ name: String, url: String, uploadedAt: Date }],
// //     others: [{ name: String, url: String, uploadedAt: Date }]
// //   },
// //   bankAssignments: [bankAssignmentSchema],
// //   overallStatus: { type: String, enum: ['active', 'closed', 'rejected','sanctioned', 'disbursed'], default: 'active' },
// //   adminNotes: String,
// // }, { timestamps: true });

// // loanApplicationSchema.pre('save', async function(next) {
// //   if (!this.applicationId) {
// //     const count = await mongoose.model('LoanApplication').countDocuments();
// //     this.applicationId = `BKL${String(count + 1).padStart(6, '0')}`;
// //   }
// //   next();
// // });

// // module.exports = mongoose.model('LoanApplication', loanApplicationSchema);












// const mongoose = require('mongoose');

// const querySchema = new mongoose.Schema({
//   raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   raisedByName: String,
//   question: String,
//   answer: String,
//   status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
//   raisedAt: { type: Date, default: Date.now },
//   resolvedAt: Date
// });

// const statusHistorySchema = new mongoose.Schema({
//   status: String,
//   changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   changedByName: String,
//   changedAt: { type: Date, default: Date.now },
//   notes: String
// });

// // CHANGED: Added maskHistory for audit trail
// const maskHistorySchema = new mongoose.Schema({
//   action: { type: String, enum: ['masked', 'unmasked'] },
//   performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   performedByName: String,
//   bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
//   bankName: String,
//   performedAt: { type: Date, default: Date.now }
// });

// const bankAssignmentSchema = new mongoose.Schema({
//   bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
//   bankName: String,
//   smId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   smName: String,
//   status: {
//     type: String,
//     enum: ['submitted','under_review','accepted','login','verification','credit_review','query_raised','query_resolved','sanctioned','agreement','disbursement','closed','rejected','on_hold'],
//     default: 'submitted'
//   },
//   // CHANGED: unmaskRequested removed — connector directly selects bank (no bank-initiated request)
//   unmaskApproved: { type: Boolean, default: false },
//   unmaskApprovedAt: Date,
//   sanctionAmount: Number,
//   sanctionDate: Date,
//   sanctionLetterUrl: String,
//   disbursementAmount: Number,
//   disbursementDate: Date,
//   disbursementAccount: String,
//   rejectionReason: String,
//   tatBreached: { type: Boolean, default: false },
//   statusHistory: [statusHistorySchema],
//   queries: [querySchema],
//   // CHANGED: interestStatus with all 3 required options (pending/interested/not_interested/need_more_info)
//   interestStatus: {
//     type: String,
//     enum: ['pending', 'interested', 'not_interested', 'need_more_info'],
//     default: 'pending'
//   },
//   interestNote: String,
//   interestUpdatedAt: Date,
//   documentDownloads: [{
//     downloadedBy: String,
//     downloadedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     downloadedAt: { type: Date, default: Date.now },
//     fileName: String
//   }],
//   emailSentAt: Date
// });

// const loanApplicationSchema = new mongoose.Schema({
//   applicationId: { type: String, unique: true },
//   connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Connector' },
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
//   loanType: { type: String, required: true },
//   loanAmount: { type: Number },
//   loanPurpose: { type: String },
//   applicantDetails: {
//     name: String,
//     mobileRaw: String,
//     mobileMasked: String,
//     email: String,
//     emailMasked: String,
//     dob: Date,
//     dobMasked: String,
//     aadhaarRaw: String,
//     aadhaarMasked: String,
//     panRaw: String,
//     panMasked: String,
//     presentAddress: String,
//     presentPincode: String,
//     presentProperty: String,
//     permanentAddress: String,
//     permanentProperty: String,
//     maritalStatus: String,
//     qualification: String,
//     motherName: String,
//     fatherName: String,
//     gender: String,
//     birthPlace: String
//   },
//   incomeDetails: {
//     employmentType: String,
//     companyName: String,
//     companyCategory: String,
//     netSalary: Number,
//     grossSalary: Number,
//     salaryMode: String,
//     designation: String,
//     doj: String,
//     totalExperience: Number,
//     previousCompany: String,
//     annualTurnover: Number,
//     businessVintage: Number
//   },
//   existingLoans: [{
//     loanType: String,
//     bankName: String,
//     loanAmount: Number,
//     emiAmount: Number,
//     sanctionDate: Date,
//     outstandingBalance: Number,
//     delayPayments: Boolean,
//     settlements: Boolean
//   }],
//   cibilScore: Number,
//   recentEnquiries: [{ bankName: String, month: String }],
//   businessDetails: {
//     firmName: String,
//     companyType: String,
//     businessAddress: String,
//     businessPincode: String,
//     natureOfBusiness: String,
//     registrationDate: String,
//     gstNumber: String,
//     msmeNumber: String,
//     itrFiled: Boolean,
//     itrData: [{ year: String, netIncome: Number, turnover: Number }]
//   },
//   propertyDetails: {
//     propertyAddress: String,
//     propertyPincode: String,
//     propertyType: String,
//     khataType: String,
//     propertyAge: Number,
//     builtUpArea: Number,
//     srValue: Number,
//     marketValue: Number,
//     rentalIncome: Number
//   },
//   vehicleDetails: {
//     make: String,
//     model: String,
//     variant: String,
//     year: Number,
//     isNew: Boolean,
//     dealerName: String,
//     exShowroomPrice: Number,
//     onRoadPrice: Number,
//     downPayment: Number
//   },
//   coApplicants: [{
//     name: String,
//     mobile: String,
//     email: String,
//     relationship: String,
//     income: Number,
//     incomeType: String
//   }],
//   documents: {
//     panCard: { url: String, uploadedAt: Date },
//     aadhaarCard: { url: String, uploadedAt: Date },
//     payslips: [{ url: String, uploadedAt: Date }],
//     bankStatements: [{ url: String, uploadedAt: Date }],
//     photo: { url: String, uploadedAt: Date },
//     form16: { url: String, uploadedAt: Date },
//     saleDeed: { url: String, uploadedAt: Date },
//     propertyDocs: [{ name: String, url: String, uploadedAt: Date }],
//     others: [{ name: String, url: String, uploadedAt: Date }]
//   },
//   bankAssignments: [bankAssignmentSchema],
//   // CHANGED: selectedBankId — set when connector selects/approves one bank (triggers unmask)
//   selectedBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', default: null },
//   selectedBankName: { type: String, default: null },
//   selectedAt: { type: Date, default: null },
//   overallStatus: { type: String, enum: ['active', 'closed', 'rejected', 'sanctioned', 'disbursed'], default: 'active' },
//   adminNotes: String,
//   // CHANGED: maskHistory for Corporate DSA audit trail
//   maskHistory: [maskHistorySchema],
// }, { timestamps: true });

// loanApplicationSchema.pre('save', async function(next) {
//   if (!this.applicationId) {
//     const count = await mongoose.model('LoanApplication').countDocuments();
//     this.applicationId = `BKL${String(count + 1).padStart(6, '0')}`;
//   }
//   next();
// });

// module.exports = mongoose.model('LoanApplication', loanApplicationSchema);












// const mongoose = require('mongoose');

// const querySchema = new mongoose.Schema({
//   raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   raisedByName: String,
//   question: String,
//   answer: String,
//   status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
//   raisedAt: { type: Date, default: Date.now },
//   resolvedAt: Date
// });

// const statusHistorySchema = new mongoose.Schema({
//   status: String,
//   changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   changedByName: String,
//   changedAt: { type: Date, default: Date.now },
//   notes: String
// });

// const maskHistorySchema = new mongoose.Schema({
//   action: { type: String, enum: ['masked', 'unmasked'] },
//   performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   performedByName: String,
//   bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
//   bankName: String,
//   performedAt: { type: Date, default: Date.now }
// });

// const bankAssignmentSchema = new mongoose.Schema({
//   bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
//   bankName: String,
//   smId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   smName: String,
//   status: {
//     type: String,
//     enum: [
//       'submitted', 'under_review', 'accepted', 'login', 'verification',
//       'credit_review', 'query_raised', 'query_resolved', 'sanctioned',
//       'agreement', 'disbursement', 'closed', 'rejected', 'on_hold'
//     ],
//     default: 'submitted'
//   },
//   unmaskApproved: { type: Boolean, default: false },
//   unmaskApprovedAt: Date,
//   sanctionAmount: Number,
//   sanctionDate: Date,
//   sanctionLetterUrl: String,
//   disbursementAmount: Number,
//   disbursementDate: Date,
//   disbursementAccount: String,
//   rejectionReason: String,
//   tatBreached: { type: Boolean, default: false },
//   statusHistory: [statusHistorySchema],
//   queries: [querySchema],
//   interestStatus: {
//     type: String,
//     enum: ['pending', 'interested', 'not_interested', 'need_more_info'],
//     default: 'pending'
//   },
//   interestNote: String,
//   interestUpdatedAt: Date,
//   documentDownloads: [{
//     downloadedBy: String,
//     downloadedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     downloadedAt: { type: Date, default: Date.now },
//     fileName: String
//   }],
//   emailSentAt: Date
// });

// const loanApplicationSchema = new mongoose.Schema({
//   applicationId: { type: String, unique: true },
//   connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Connector' },
//   companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
//   loanType: { type: String, required: true },
//   loanAmount: { type: Number },
//   loanPurpose: { type: String },

//   applicantDetails: {
//     name: String,
//     mobile: String,
//     mobileMasked: String,
//     email: String,
//     emailMasked: String,
//     dob: Date,
//     dobMasked: String,
//     aadhaar: String,
//     aadhaarMasked: String,
//     pan: String,
//     panMasked: String,
//     presentAddress: String,
//     presentPincode: String,
//     presentProperty: String,
//     permanentAddress: String,
//     permanentProperty: String,
//     maritalStatus: String,
//     qualification: String,
//     motherName: String,
//     fatherName: String,
//     gender: String,
//     birthPlace: String
//   },

//   incomeDetails: {
//     employmentType: String,
//     companyName: String,
//     companyCategory: String,
//     netSalary: Number,
//     grossSalary: Number,
//     salaryMode: String,
//     designation: String,
//     doj: String,
//     totalExperience: Number,
//     previousCompany: String,
//     annualTurnover: Number,
//     businessVintage: Number
//   },

//   businessDetails: {
//     firmName: String,
//     companyType: String,
//     businessAddress: String,
//     businessPincode: String,
//     natureOfBusiness: String,
//     registrationDate: String,
//     gstNumber: String,
//     msmeNumber: String,
//     itrFiled: Boolean,
//     itrData: [{
//       year: String,
//       netIncome: Number,
//       turnover: Number
//     }]
//   },

//   propertyDetails: {
//     propertyAddress: String,
//     propertyPincode: String,
//     propertyType: String,
//     khataType: String,
//     propertyAge: Number,
//     builtUpArea: Number,
//     srValue: Number,
//     marketValue: Number,
//     rentalIncome: Number
//   },

//   vehicleDetails: {
//     make: String,
//     model: String,
//     variant: String,
//     year: Number,
//     isNew: Boolean,
//     dealerName: String,
//     exShowroomPrice: Number,
//     onRoadPrice: Number,
//     downPayment: Number
//   },

//   existingLoans: [{
//     loanType: String,
//     bankName: String,
//     loanAmount: Number,
//     emiAmount: Number,
//     sanctionDate: Date,
//     outstandingBalance: Number,
//     delayPayments: Boolean,
//     settlements: Boolean
//   }],

//   coApplicants: [{
//     name: String,
//     mobile: String,
//     email: String,
//     relationship: String,
//     income: Number,
//     incomeType: String
//   }],

//   cibilScore: Number,
//   recentEnquiries: [{ bankName: String, month: String }],

//   // FIX: all document fields use { url, uploadedAt } objects — never plain strings
//   documents: {
//     panCard:        { url: String, uploadedAt: { type: Date, default: Date.now } },
//     aadhaarCard:    { url: String, uploadedAt: { type: Date, default: Date.now } },
//     photo:          { url: String, uploadedAt: { type: Date, default: Date.now } },
//     form16:         { url: String, uploadedAt: { type: Date, default: Date.now } },
//     saleDeed:       { url: String, uploadedAt: { type: Date, default: Date.now } },
//     payslips:       [{ url: String, uploadedAt: { type: Date, default: Date.now } }],
//     bankStatements: [{ url: String, uploadedAt: { type: Date, default: Date.now } }],
//     propertyDocs:   [{ name: String, url: String, uploadedAt: { type: Date, default: Date.now } }],
//     others:         [{ name: String, url: String, uploadedAt: { type: Date, default: Date.now } }]
//   },

//   bankAssignments: [bankAssignmentSchema],

//   // Connector selects one bank after reviewing interest responses (triggers unmask)
//   selectedBankId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', default: null },
//   selectedBankName: { type: String, default: null },
//   selectedAt:       { type: Date, default: null },

//   overallStatus: {
//     type: String,
//     enum: ['active', 'closed', 'rejected', 'sanctioned', 'disbursed'],
//     default: 'active'
//   },

//   adminNotes: String,
//   maskHistory: [maskHistorySchema],

// }, { timestamps: true });

// loanApplicationSchema.pre('save', async function (next) {
//   if (!this.applicationId) {
//     const count = await mongoose.model('LoanApplication').countDocuments();
//     this.applicationId = `BKL${String(count + 1).padStart(6, '0')}`;
//   }
//   next();
// });

// module.exports = mongoose.model('LoanApplication', loanApplicationSchema);






const mongoose = require("mongoose");
const { Schema } = mongoose;

const statusHistorySchema = new Schema(
  {
    status: { type: String, required: true }, // submitted | interested | not_interested | in_review | approved | rejected | disbursed ...
    changedByName: { type: String },
    changedAt: { type: Date, default: Date.now },
    notes: { type: String, default: "" },
  },
  { _id: true }
);

const queryItemSchema = new Schema(
  {
    raisedByName: String,
    message: String,
    raisedAt: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
  },
  { _id: true }
);

const documentDownloadSchema = new Schema(
  {
    documentKey: String, // e.g. "panCard", "aadhaarCard"
    downloadedByName: String,
    downloadedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const bankAssignmentSchema = new Schema(
  {
    bankId: { type: Schema.Types.ObjectId, ref: "Bank", required: true },
    bankName: { type: String, required: true },

    // Lifecycle of this specific bank's handling of the lead
    // status: {
    //   type: String,
    //   enum: ["submitted", "in_review", "approved", "rejected", "disbursed", "withdrawn"],
    //   default: "submitted",
    // },

    // Bank's response to the masked lead: has it expressed interest?
    // interestStatus: {
    //   type: String,
    //   enum: ["pending", "interested", "not_interested"],
    //   default: "pending",
    // },

status: {
  type: String,
  enum: ["submitted", "in_review", "accepted", "approved", "rejected", "disbursed", "withdrawn", "query_raised", "query_resolved", "sanctioned", "agreement", "disbursement", "closed"],
  default: "submitted",
},

interestStatus: {
  type: String,
  enum: ["pending", "interested", "not_interested", "need_more_info"],
  default: "pending",
},




    interestNote: { type: String, default: "" },
    interestUpdatedAt: { type: Date },

    // Unmasking is scoped PER BANK — only the selected bank should ever
    // have unmaskApproved = true.
    unmaskApproved: { type: Boolean, default: false },
    unmaskApprovedAt: { type: Date },

    tatBreached: { type: Boolean, default: false },
    emailSentAt: { type: Date },

    statusHistory: [statusHistorySchema],
    queries: [queryItemSchema],
    documentDownloads: [documentDownloadSchema],
  },
  { _id: true }
);

const maskHistoryEntrySchema = new Schema(
  {
    action: { type: String, enum: ["masked", "unmasked"], required: true },
    performedBy: { type: Schema.Types.ObjectId, ref: "User" },
    performedByName: String,
    bankId: { type: Schema.Types.ObjectId, ref: "Bank" },
    bankName: String,
    performedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);


const applicantDetailsSchema = new Schema(
  {
    name: { type: String, default: "" },
    nameMasked: { type: String, default: "" }, 

    mobile: { type: String, default: "" }, // real value
    mobileMasked: { type: String, default: "" }, // derived, recomputed on save

    email: { type: String, default: "" },
    emailMasked: { type: String, default: "" },

    dob: { type: Date, default: null },
    dobMasked: { type: String, default: "" },

    aadhaar: { type: String, default: "" },
    aadhaarMasked: { type: String, default: "" },

    pan: { type: String, default: "" },
    panMasked: { type: String, default: "" },

    presentAddress: { type: String, default: "" },
    presentPincode: { type: String, default: "" },
    presentProperty: { type: String, enum: ["Rented", "Owned", "Family Owned"], default: "Rented" },

    permanentAddress: { type: String, default: "" },
    permanentProperty: { type: String, enum: ["Rented", "Owned", "Family Owned"], default: "Owned" },

    maritalStatus: { type: String, default: "Single" },
    qualification: { type: String, default: "" },
    motherName: { type: String, default: "" },
    fatherName: { type: String, default: "" },
  },
  { _id: false }
);

const loanApplicationSchema = new Schema(
  {
    connectorId: { type: Schema.Types.ObjectId, ref: "Connector", required: true },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },

    applicationId: { type: String, unique: true, index: true },

    loanType: { type: String, required: true },
    loanAmount: { type: Number, default: 0 },
    loanPurpose: { type: String, default: "New Loan" },

    applicantDetails: applicantDetailsSchema,

    incomeDetails: { type: Schema.Types.Mixed, default: {} },
    businessDetails: { type: Schema.Types.Mixed, default: {} },
    propertyDetails: { type: Schema.Types.Mixed, default: {} },
    vehicleDetails: { type: Schema.Types.Mixed, default: {} },
    existingLoans: { type: [Schema.Types.Mixed], default: [] },

    cibilScore: { type: Number, default: 0 },
    documents: { type: Schema.Types.Mixed, default: {} },

    // Every bank the connector pushed this lead to, with its own
    // independent status/interest/unmask state.
    bankAssignments: [bankAssignmentSchema],

    // Set only once the connector finalizes which bank to proceed with
    selectedBankId: { type: Schema.Types.ObjectId, ref: "Bank" },
    selectedBankName: String,
    selectedAt: Date,

    overallStatus: {
      type: String,
      enum: ["draft", "active", "closed", "disbursed", "cancelled"],
      default: "active",
    },

    maskHistory: [maskHistoryEntrySchema],
    coApplicants: { type: [Schema.Types.Mixed], default: [] },
    recentEnquiries: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

// Auto-generate applicationId like "BKL000018"
loanApplicationSchema.pre("save", async function (next) {
  if (!this.applicationId) {
    const Model = this.constructor;
    const last = await Model.findOne({}, {}, { sort: { createdAt: -1 } });
    let nextNum = 1;
    if (last && last.applicationId) {
      const match = last.applicationId.match(/(\d+)$/);
      if (match) nextNum = parseInt(match[1], 10) + 1;
    }
    this.applicationId = `BKL${String(nextNum).padStart(6, "0")}`;
  }
  next();
});

module.exports = mongoose.model("LoanApplication", loanApplicationSchema);