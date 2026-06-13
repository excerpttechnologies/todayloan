const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  raisedByName: String,
  question: String,
  answer: String,
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  raisedAt: { type: Date, default: Date.now },
  resolvedAt: Date
});

const statusHistorySchema = new mongoose.Schema({
  status: String,
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  changedByName: String,
  changedAt: { type: Date, default: Date.now },
  notes: String
});

const bankAssignmentSchema = new mongoose.Schema({
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' },
  bankName: String,
  smId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  smName: String,
  status: {
    type: String,
    enum: ['submitted','under_review','accepted','login','verification','credit_review','query_raised','query_resolved','sanctioned','agreement','disbursement','closed','rejected','on_hold'],
    default: 'submitted'
  },
  unmaskRequested: { type: Boolean, default: false },
  unmaskApproved: { type: Boolean, default: false },
  unmaskApprovedAt: Date,
  sanctionAmount: Number,
  sanctionDate: Date,
  sanctionLetterUrl: String,
  disbursementAmount: Number,
  disbursementDate: Date,
  disbursementAccount: String,
  rejectionReason: String,
  tatBreached: { type: Boolean, default: false },
  statusHistory: [statusHistorySchema],
  queries: [querySchema]
});

const loanApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },
  connectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Connector' },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  loanType: { type: String, required: true },
  loanAmount: { type: Number },
  loanPurpose: { type: String },
  applicantDetails: {
    name: String,
    mobileRaw: String,
    mobileMasked: String,
    email: String,
    emailMasked: String,
    dob: Date,
    dobMasked: String,
    aadhaarRaw: String,
    aadhaarMasked: String,
    panRaw: String,
    panMasked: String,
    presentAddress: String,
    presentPincode: String,
    presentProperty: String,
    permanentAddress: String,
    permanentProperty: String,
    maritalStatus: String,
    qualification: String,
    motherName: String,
    fatherName: String,
    gender: String,
    birthPlace: String
  },
  incomeDetails: {
    employmentType: String,
    companyName: String,
    companyCategory: String,
    netSalary: Number,
    grossSalary: Number,
    salaryMode: String,
    designation: String,
    doj: String,
    totalExperience: Number,
    previousCompany: String,
    annualTurnover: Number,
    businessVintage: Number
  },
  existingLoans: [{
    loanType: String,
    bankName: String,
    loanAmount: Number,
    emiAmount: Number,
    sanctionDate: Date,
    outstandingBalance: Number,
    delayPayments: Boolean,
    settlements: Boolean
  }],
  cibilScore: Number,
  recentEnquiries: [{ bankName: String, month: String }],
  businessDetails: {
    firmName: String,
    companyType: String,
    businessAddress: String,
    businessPincode: String,
    natureOfBusiness: String,
    registrationDate: String,
    gstNumber: String,
    msmeNumber: String,
    itrFiled: Boolean,
    itrData: [{
      year: String,
      netIncome: Number,
      turnover: Number
    }]
  },
  propertyDetails: {
    propertyAddress: String,
    propertyPincode: String,
    propertyType: String,
    khataType: String,
    propertyAge: Number,
    builtUpArea: Number,
    srValue: Number,
    marketValue: Number,
    rentalIncome: Number
  },
  vehicleDetails: {
    make: String,
    model: String,
    variant: String,
    year: Number,
    isNew: Boolean,
    dealerName: String,
    exShowroomPrice: Number,
    onRoadPrice: Number,
    downPayment: Number
  },
  coApplicants: [{
    name: String,
    mobile: String,
    email: String,
    relationship: String,
    income: Number,
    incomeType: String
  }],
  documents: {
    panCard: { url: String, uploadedAt: Date },
    aadhaarCard: { url: String, uploadedAt: Date },
    payslips: [{ url: String, uploadedAt: Date }],
    bankStatements: [{ url: String, uploadedAt: Date }],
    photo: { url: String, uploadedAt: Date },
    form16: { url: String, uploadedAt: Date },
    saleDeed: { url: String, uploadedAt: Date },
    propertyDocs: [{ name: String, url: String, uploadedAt: Date }],
    others: [{ name: String, url: String, uploadedAt: Date }]
  },
  bankAssignments: [bankAssignmentSchema],
  overallStatus: { type: String, enum: ['active', 'closed', 'rejected'], default: 'active' },
  adminNotes: String,
}, { timestamps: true });

loanApplicationSchema.pre('save', async function(next) {
  if (!this.applicationId) {
    const count = await mongoose.model('LoanApplication').countDocuments();
    this.applicationId = `BKL${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
