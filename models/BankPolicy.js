const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────────────────────
// BankPolicy — separate module, separate collection.
// Does NOT touch Bank / Company / Connector / LoanApplication collections.
// ─────────────────────────────────────────────────────────────────────────────

// A single "loan amount wise ROI" slab
const roiSlabSchema = new mongoose.Schema({
  minAmount: { type: Number, default: 0 },
  maxAmount: { type: Number, default: 0 },
  roi: { type: Number, default: 0 },
}, { _id: false });

// Dynamic rule — lets Admin/Bank add brand-new eligibility checks
// without any code change. `field` is a dot-path into the LoanApplication
// document (e.g. "incomeDetails.totalExperience"), `operator` decides how
// `value` is compared against whatever is found at that path.
const customRuleSchema = new mongoose.Schema({
  ruleName: { type: String, required: true, trim: true },
  field: { type: String, required: true, trim: true },
  operator: {
    type: String,
    enum: ['>=', '<=', '>', '<', '==', '!=', 'in', 'notIn'],
    default: '>=',
  },
  value: { type: mongoose.Schema.Types.Mixed },
  failMessage: { type: String, default: '' },
}, { _id: true });

const bankPolicySchema = new mongoose.Schema({
  // ── General Information ──
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: true },
  bankName: { type: String, required: true, trim: true },
  loanType: { type: String, required: true },
  policyVersion: { type: String, default: 'v1' },
  effectiveDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },

  // ── Eligibility ──
  eligibility: {
    minAge: { type: Number, default: 21 },
    maxAge: { type: Number, default: 60 },
    minSalary: { type: Number, default: 0 },
    minCibil: { type: Number, default: 0 },
    maxFOIR: { type: Number, default: 100 },
    maxMultiplier: { type: Number, default: 0 },
    maxLoanAmount: { type: Number, default: 0 },
    minLoanAmount: { type: Number, default: 0 },
    maxTenure: { type: Number, default: 0 }, // months
  },

  // ── Enquiry Policy ──
  enquiryPolicy: {
    windowDays: { type: Number, enum: [30, 60, 90], default: 30 },
    maxEnquiries: { type: Number, default: 3 },
  },

  // ── Bounce Policy ──
  bouncePolicy: {
    windowMonths: { type: Number, enum: [3, 6, 12], default: 3 },
    maxBounces: { type: Number, default: 0 },
  },

  // ── Employment Policy ──
  employmentPolicy: {
    allowedProfiles: [{ type: String }],
    restrictedProfiles: [{ type: String }],
    allowedCompanies: [{ type: String }],
    restrictedCompanies: [{ type: String }],
  },

  // ── DPD Policy ──
  dpdPolicy: {
    maxDPD: { type: Number, default: 0 },
    allow90PlusDPD: { type: Boolean, default: false },
  },

  // ── Loan Rules ──
  loanRules: {
    maxActiveLoans: { type: Number, default: 0 },
    maxSTPL: { type: Number, default: 0 },
    btAllowed: { type: Boolean, default: false },
    topUpAllowed: { type: Boolean, default: false },
    maxBT: { type: Number, default: 0 },
    odBT: { type: Boolean, default: false },
    nocRequired: { type: Boolean, default: false },
  },

  // ── ROI ──
  roi: {
    categoryA: { type: Number, default: 0 },
    categoryB: { type: Number, default: 0 },
    categoryC: { type: Number, default: 0 },
    categoryD: { type: Number, default: 0 },
    loanAmountWiseROI: [roiSlabSchema],
    openMarketDoable: { type: Boolean, default: true }, // Doable / Not Doable
  },

  specialNotes: { type: String, default: '' },

  // Admin/Bank can add unlimited custom rules here without touching code
  customRules: [customRuleSchema],

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

bankPolicySchema.index({ bankId: 1, loanType: 1, status: 1 });

module.exports = mongoose.model('BankPolicy', bankPolicySchema);
