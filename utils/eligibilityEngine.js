// ─────────────────────────────────────────────────────────────────────────────
// eligibilityEngine.js
// Pure, side-effect-free comparison of a LoanApplication against a BankPolicy.
// Used by applicationController.createApplication (and the on-demand
// re-check endpoint) to produce:
//   { eligible: boolean, checks: [{ label, passed, message }] }
//
// This module does not import any Mongoose models — it only ever receives
// plain objects, so it can never accidentally mutate/save anything.
// ─────────────────────────────────────────────────────────────────────────────

const getAge = (dob) => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const diff = Date.now() - birth.getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
};

const getAverageSalary = (incomeDetails = {}) => {
  const months = [
    Number(incomeDetails.netSalaryMonth1) || 0,
    Number(incomeDetails.netSalaryMonth2) || 0,
    Number(incomeDetails.netSalaryMonth3) || 0,
  ].filter((v) => v > 0);
  if (!months.length) return Number(incomeDetails.grossSalary) || 0;
  return months.reduce((a, b) => a + b, 0) / months.length;
};

const sumExistingEMIs = (existingLoans = []) =>
  (existingLoans || []).reduce((sum, l) => sum + (Number(l?.emiAmount) || 0), 0);

const getMaxDPD = (existingLoans = []) => {
  const dpds = (existingLoans || []).map((l) => Number(l?.dpd) || 0);
  return dpds.length ? Math.max(...dpds) : 0;
};

const has90PlusDPD = (existingLoans = []) =>
  (existingLoans || []).some((l) => (Number(l?.dpd) || 0) >= 90);

const sumBounces = (existingLoans = []) =>
  (existingLoans || []).reduce((sum, l) => sum + (Number(l?.bounces) || 0), 0);

const getByPath = (obj, path) => {
  try {
    return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
  } catch {
    return undefined;
  }
};

const evalOperator = (actual, operator, expected) => {
  switch (operator) {
    case '>=': return Number(actual) >= Number(expected);
    case '<=': return Number(actual) <= Number(expected);
    case '>': return Number(actual) > Number(expected);
    case '<': return Number(actual) < Number(expected);
    case '==': return actual === expected;
    case '!=': return actual !== expected;
    case 'in': return Array.isArray(expected) && expected.includes(actual);
    case 'notIn': return Array.isArray(expected) && !expected.includes(actual);
    default: return true;
  }
};

/**
 * @param {Object} application - plain LoanApplication object (use .toObject() if it's a Mongoose doc)
 * @param {Object} policy - plain BankPolicy object
 * @returns {{ eligible: boolean, checks: Array<{label:string, passed:boolean, message:string}> }}
 */
function evaluateEligibility(application, policy) {
  const checks = [];
  const push = (label, passed, message) => checks.push({ label, passed, message });

  const elig = policy.eligibility || {};
  const income = application.incomeDetails || {};
  const existingLoans = application.existingLoans || [];

  // ── Age ──
  const age = getAge(application.applicantDetails?.dob);
  if (age === null) {
    push('Age', true, 'DOB not provided — skipped');
  } else if (age < (elig.minAge ?? 0) || age > (elig.maxAge ?? 100)) {
    push('Age', false, `Age ${age} not in allowed range ${elig.minAge}-${elig.maxAge}`);
  } else {
    push('Age', true, `Age ${age} within ${elig.minAge}-${elig.maxAge}`);
  }

  // ── Salary ──
  const salary = getAverageSalary(income);
  if ((elig.minSalary || 0) > 0) {
    if (salary < elig.minSalary) {
      push('Salary', false, `Salary ₹${salary.toLocaleString('en-IN')} below minimum ₹${elig.minSalary.toLocaleString('en-IN')}`);
    } else {
      push('Salary', true, `Salary ₹${salary.toLocaleString('en-IN')} meets minimum`);
    }
  }

  // ── CIBIL ──
  const cibil = Number(application.cibilScore) || 0;
  if ((elig.minCibil || 0) > 0) {
    if (cibil < elig.minCibil) {
      push('CIBIL', false, `CIBIL should be ${elig.minCibil} (got ${cibil || 'N/A'})`);
    } else {
      push('CIBIL', true, `CIBIL ${cibil} meets minimum ${elig.minCibil}`);
    }
  }

  // ── FOIR ──
  if ((elig.maxFOIR || 0) > 0 && salary > 0) {
    const totalEMI = sumExistingEMIs(existingLoans);
    const foir = (totalEMI / salary) * 100;
    if (foir > elig.maxFOIR) {
      push('FOIR', false, `FOIR exceeded (${foir.toFixed(1)}% > ${elig.maxFOIR}%)`);
    } else {
      push('FOIR', true, `FOIR ${foir.toFixed(1)}% within ${elig.maxFOIR}%`);
    }
  }

  // ── Loan Amount ──
  const loanAmount = Number(application.loanAmount) || 0;
  if ((elig.maxLoanAmount || 0) > 0 && loanAmount > elig.maxLoanAmount) {
    push('Loan Amount', false, `Requested ₹${loanAmount.toLocaleString('en-IN')} exceeds max ₹${elig.maxLoanAmount.toLocaleString('en-IN')}`);
  } else if ((elig.minLoanAmount || 0) > 0 && loanAmount < elig.minLoanAmount) {
    push('Loan Amount', false, `Requested ₹${loanAmount.toLocaleString('en-IN')} below min ₹${elig.minLoanAmount.toLocaleString('en-IN')}`);
  } else if (elig.maxLoanAmount || elig.minLoanAmount) {
    push('Loan Amount', true, `Requested amount within allowed range`);
  }

  // ── DPD ──
  const dpdPolicy = policy.dpdPolicy || {};
  if ((dpdPolicy.maxDPD || 0) > 0) {
    const maxDPD = getMaxDPD(existingLoans);
    if (maxDPD > dpdPolicy.maxDPD) {
      push('DPD', false, `DPD failed (${maxDPD} > allowed ${dpdPolicy.maxDPD})`);
    } else {
      push('DPD', true, `DPD ${maxDPD} within allowed ${dpdPolicy.maxDPD}`);
    }
  }
  if (!dpdPolicy.allow90PlusDPD && has90PlusDPD(existingLoans)) {
    push('90+ DPD', false, '90+ DPD found — not allowed by this bank');
  }

  // ── Bounce Policy ──
  const bouncePolicy = policy.bouncePolicy || {};
  if ((bouncePolicy.maxBounces ?? null) !== null && existingLoans.length) {
    const bounces = sumBounces(existingLoans);
    if (bounces > (bouncePolicy.maxBounces || 0)) {
      push('Bounces', false, `Bounces in last ${bouncePolicy.windowMonths} months (${bounces}) exceed allowed (${bouncePolicy.maxBounces})`);
    } else {
      push('Bounces', true, `Bounces within allowed limit`);
    }
  }

  // ── Enquiry Policy ──
  const enquiryPolicy = policy.enquiryPolicy || {};
  const recentEnquiries = application.recentEnquiries || [];
  if ((enquiryPolicy.maxEnquiries ?? null) !== null && recentEnquiries.length) {
    if (recentEnquiries.length > (enquiryPolicy.maxEnquiries || 0)) {
      push('Enquiries', false, `Enquiries in last ${enquiryPolicy.windowDays} days (${recentEnquiries.length}) exceed allowed (${enquiryPolicy.maxEnquiries})`);
    } else {
      push('Enquiries', true, `Enquiries within allowed limit`);
    }
  }

  // ── Active Loans ──
  const loanRules = policy.loanRules || {};
  if ((loanRules.maxActiveLoans || 0) > 0) {
    if (existingLoans.length > loanRules.maxActiveLoans) {
      push('Active Loans', false, `Active loans (${existingLoans.length}) exceed allowed (${loanRules.maxActiveLoans})`);
    } else {
      push('Active Loans', true, `Active loans within allowed limit`);
    }
  }

  // ── Employment: Profile ──
  const empPolicy = policy.employmentPolicy || {};
  const profile = income.designation || income.employmentType || '';
  if (profile && empPolicy.restrictedProfiles?.length && empPolicy.restrictedProfiles.includes(profile)) {
    push('Employment Profile', false, `Profile "${profile}" is restricted by this bank`);
  } else if (profile && empPolicy.allowedProfiles?.length && !empPolicy.allowedProfiles.includes(profile)) {
    push('Employment Profile', false, `Profile "${profile}" is not in the allowed list`);
  } else if (profile) {
    push('Employment Profile', true, `Profile "${profile}" allowed`);
  }

  // ── Employment: Company ──
  const companyName = income.companyName || '';
  if (companyName && empPolicy.restrictedCompanies?.length && empPolicy.restrictedCompanies.includes(companyName)) {
    push('Company', false, `Company "${companyName}" is restricted by this bank`);
  } else if (companyName && empPolicy.allowedCompanies?.length && !empPolicy.allowedCompanies.includes(companyName)) {
    push('Company', false, `Company "${companyName}" is not in the allowed list`);
  } else if (companyName) {
    push('Company', true, `Company "${companyName}" allowed`);
  }

  // ── Custom Rules (dynamic, no-code) ──
  (policy.customRules || []).forEach((rule) => {
    const actual = getByPath(application, rule.field);
    if (actual === undefined) return; // no data available for this rule — skip silently
    const passed = evalOperator(actual, rule.operator, rule.value);
    push(
      rule.ruleName,
      passed,
      passed ? `${rule.ruleName} passed` : (rule.failMessage || `${rule.ruleName} failed`)
    );
  });

  const eligible = checks.every((c) => c.passed);
  return { eligible, checks, policyId: policy._id, policyVersion: policy.policyVersion, evaluatedAt: new Date() };
}

module.exports = { evaluateEligibility };
