const mongoose = require('mongoose');
const loanApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, unique: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  connector: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  loanType: { type: String, enum: ['personal','business','home','car','lap','mortgage','education','gold'], required: true },
  loanAmount: { type: Number, required: true }, loanPurpose: String, tenure: Number,
  personalDetails: { name: String, mobile: String, email: String, pan: String, aadhaar: String, dob: Date, gender: String, city: String, state: String, address: String, pincode: String },
  employmentType: String,
  employmentDetails: { companyName: String, designation: String, salary: Number, businessName: String, businessType: String, annualTurnover: Number, businessVintage: Number, gstNumber: String },
  financialDetails: { cibilScore: Number, existingEmi: Number, bankName: String },
  propertyDetails: { propertyType: String, propertyValue: Number, propertyLocation: String },
  vehicleDetails: { vehicleType: String, vehicleMake: String, vehicleModel: String, vehicleYear: Number, vehicleValue: Number },
  eligibilityStatus: { type: String, enum: ['pending','eligible','ineligible'], default: 'pending' },
  eligibilityRemarks: String, eligibilityScore: Number,
  status: { type: String, enum: ['draft','submitted','processing','distributed','sanctioned','rejected','disbursed','closed'], default: 'draft' },
  source: { type: String, enum: ['direct','connector','referral'], default: 'direct' },
}, { timestamps: true });

loanApplicationSchema.pre('save', async function(next) {
  if (!this.applicationId) {
    const prefix = { personal:'PL', business:'BL', home:'HL', car:'CL', lap:'LAP', mortgage:'ML', education:'EL', gold:'GL' };
    const count = await mongoose.model('LoanApplication').countDocuments();
    this.applicationId = `${prefix[this.loanType]||'LN'}${String(count+1).padStart(4,'0')}`;
  }
  next();
});
module.exports = mongoose.model('LoanApplication', loanApplicationSchema);
