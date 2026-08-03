const mongoose = require('mongoose');

// ─────────────────────────────────────────────────────────────────────────────
// CompanyCategory — a very simple, separate lookup table.
// Each bank uploads an Excel sheet of "Company Name | Category" (e.g. A/B/C/D).
// When a connector submits an application, the applicant's companyName is
// looked up here (per bank) and the matching category is shown.
// ─────────────────────────────────────────────────────────────────────────────

const companyCategorySchema = new mongoose.Schema({
  bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank', required: true },
  bankName: { type: String, required: true },
  companyName: { type: String, required: true, trim: true },
  // normalized (lowercase, trimmed) copy used for matching so that
  // "Infosys", "INFOSYS", " infosys " all match the same row
  companyNameKey: { type: String, required: true, index: true },
  category: { type: String, required: true, trim: true }, // whatever the bank writes in the sheet — no restriction
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

companyCategorySchema.index({ bankId: 1, companyNameKey: 1 }, { unique: true });

companyCategorySchema.pre('validate', function (next) {
  if (this.companyName) this.companyNameKey = this.companyName.trim().toLowerCase();
  next();
});

module.exports = mongoose.model('CompanyCategory', companyCategorySchema);
