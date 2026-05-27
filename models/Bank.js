// Bank.js
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  bankName:           { type: String, required: true },
  code:               { type: String, unique: true, sparse: true },
  logo:               { type: String, default: '' },
  type:               { type: String, enum: ['bank', 'nbfc', 'hfc'], default: 'bank' },
  loanTypesSupported: { type: [String], default: [] },
  isActive:           { type: Boolean, default: true },
  contactEmail:       String,
  contactPhone:       String,
  assignedManagers:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Bank', bankSchema);
