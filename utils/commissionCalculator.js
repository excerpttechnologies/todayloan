const Commission = require('../models/Commission');

const DEFAULT_RATES = { 'Personal Loan':1.0,'Business Loan':2.0,'Home Loan':0.5,'Car Loan':1.5,'Mortgage Loan/LAP':0.75,'Construction Loan':0.5,'Education Loan':0.5,'Gold Loan':0.25,'default':1.0 };

const getRate = (loanType, overrideRate=null) => {
  if (overrideRate && overrideRate > 0) return Number(overrideRate);
  return DEFAULT_RATES[loanType] || DEFAULT_RATES.default;
};

const calcAmount = (loanAmount, rate) => parseFloat(((loanAmount * rate) / 100).toFixed(2));

const createCommission = async ({ connectorId, leadId, loanType, loanAmount, overrideRate=null }) => {
  const existing = await Commission.findOne({ leadId, connectorId });
  if (existing) return existing;
  const rate   = getRate(loanType, overrideRate);
  const amount = calcAmount(loanAmount, rate);
  return await Commission.create({ connectorId, leadId, loanType, loanAmount, commissionRate: rate, commissionAmount: amount, overrideRate, status: 'pending' });
};

module.exports = { getRate, calcAmount, createCommission, DEFAULT_RATES };
