const XLSX = require('xlsx');

const YES_WORDS = ['yes', 'y', 'true', '1', 'allowed', 'required'];
const toBool = (v) => YES_WORDS.includes(String(v ?? '').trim().toLowerCase());
const toNum = (v) => { const n = Number(v); return isNaN(n) ? 0 : n; };
const toList = (v) => String(v ?? '').split(',').map((s) => s.trim()).filter(Boolean);

// Excel date cells can arrive as: a JS Date (if cellDates:true), an Excel
// serial number (if not), or a plain "YYYY-MM-DD" string typed by hand.
// Normalize all three into an ISO date string so Mongoose's Date cast
// never chokes on something like "45870".
const toDateString = (v) => {
  if (v instanceof Date && !isNaN(v)) return v.toISOString().slice(0, 10);
  if (typeof v === 'number') {
    const parsed = XLSX.SSF.parse_date_code(v);
    if (parsed) {
      const d = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
      if (!isNaN(d)) return d.toISOString().slice(0, 10);
    }
  }
  const d = new Date(v);
  return isNaN(d) ? undefined : d.toISOString().slice(0, 10);
};
// normalized label -> [dot-path into policy object, converter]
const FIELD_MAP = {
  'loantype': ['loanType', String],
  'policyversion': ['policyVersion', String],
 'effectivedate': ['effectiveDate', toDateString],
  'status': ['status', (v) => (String(v).trim().toLowerCase() === 'inactive' ? 'inactive' : 'active')],

  'minimumage': ['eligibility.minAge', toNum],
  'maximumage': ['eligibility.maxAge', toNum],
  'minimumsalary': ['eligibility.minSalary', toNum],
  'minimumcibil': ['eligibility.minCibil', toNum],
  'maximumfoir': ['eligibility.maxFOIR', toNum],
  'maximummultiplier': ['eligibility.maxMultiplier', toNum],
  'maximumloanamount': ['eligibility.maxLoanAmount', toNum],
  'minimumloanamount': ['eligibility.minLoanAmount', toNum],
  'maximumtenure': ['eligibility.maxTenure', toNum],

  'enquirywindowdays': ['enquiryPolicy.windowDays', (v) => [30, 60, 90].includes(toNum(v)) ? toNum(v) : 30],
  'maxenquiries': ['enquiryPolicy.maxEnquiries', toNum],

  'bouncewindowmonths': ['bouncePolicy.windowMonths', (v) => [3, 6, 12].includes(toNum(v)) ? toNum(v) : 3],
  'maxbounces': ['bouncePolicy.maxBounces', toNum],

  'allowedprofiles': ['employmentPolicy.allowedProfiles', toList],
  'restrictedprofiles': ['employmentPolicy.restrictedProfiles', toList],
  'allowedcompanies': ['employmentPolicy.allowedCompanies', toList],
  'restrictedcompanies': ['employmentPolicy.restrictedCompanies', toList],

  'maxdpd': ['dpdPolicy.maxDPD', toNum],
  'allow90+dpd': ['dpdPolicy.allow90PlusDPD', toBool],
  'allow90plusdpd': ['dpdPolicy.allow90PlusDPD', toBool],

  'maxactiveloans': ['loanRules.maxActiveLoans', toNum],
  'maxstpl': ['loanRules.maxSTPL', toNum],
  'btallowed': ['loanRules.btAllowed', toBool],
  'topupallowed': ['loanRules.topUpAllowed', toBool],
  'maxbt': ['loanRules.maxBT', toNum],
  'odbt': ['loanRules.odBT', toBool],
  'nocrequired': ['loanRules.nocRequired', toBool],

  'roicategorya': ['roi.categoryA', toNum],
  'roicategoryb': ['roi.categoryB', toNum],
  'roicategoryc': ['roi.categoryC', toNum],
  'roicategoryd': ['roi.categoryD', toNum],
  'openmarketdoable': ['roi.openMarketDoable', toBool],

  'specialnotes': ['specialNotes', String],
};

const normalizeLabel = (s) => String(s ?? '').trim().toLowerCase().replace(/[\s_-]+/g, '');

const setByPath = (obj, path, value) => {
  const keys = path.split('.');
  let node = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    node[keys[i]] = node[keys[i]] || {};
    node = node[keys[i]];
  }
  node[keys[keys.length - 1]] = value;
};

/**
 * @param {Buffer} buffer - the uploaded .xlsx/.xls file buffer
 * @returns {Object} partial BankPolicy object built from the sheet
 */
function parsePolicyExcel(buffer) {
const wb = XLSX.read(buffer, { type: 'buffer', cellDates: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // array of [colA, colB, ...]

  const policy = {};
  rows.forEach((row) => {
  if (!row || row.length < 2) return;
  const label = normalizeLabel(row[0]);
  const value = row[1];
  if (!label || value === undefined || value === '') return;
  const mapping = FIELD_MAP[label];
  if (!mapping) return;
  const [path, convert] = mapping;
  const converted = convert(value);
  if (converted === undefined) return; // e.g. unparseable date — skip, keep default
  setByPath(policy, path, converted);
});

  return policy;
}

/**
 * Builds a ready-to-fill Excel template with every supported field name in
 * column A and an example/blank in column B, so bank staff never have to
 * guess the exact field names.
 */
function buildPolicyTemplateBuffer() {
  const rows = [
    ['Field', 'Value', 'Notes'],
    ['Loan Type', 'Personal Loan', 'e.g. Personal Loan / Home Loan / Business Loan'],
    ['Policy Version', 'v1', ''],
    ['Effective Date', new Date().toISOString().slice(0, 10), 'YYYY-MM-DD'],
    ['Status', 'active', 'active or inactive'],
    ['Minimum Age', 21, ''],
    ['Maximum Age', 60, ''],
    ['Minimum Salary', 20000, ''],
    ['Minimum CIBIL', 700, ''],
    ['Maximum FOIR', 50, 'in %'],
    ['Maximum Multiplier', 0, ''],
    ['Minimum Loan Amount', 100000, ''],
    ['Maximum Loan Amount', 2000000, ''],
    ['Maximum Tenure', 60, 'in months'],
    ['Enquiry Window Days', 30, '30, 60 or 90'],
    ['Max Enquiries', 3, ''],
    ['Bounce Window Months', 3, '3, 6 or 12'],
    ['Max Bounces', 2, ''],
    ['Allowed Profiles', 'Salaried', 'comma separated'],
    ['Restricted Profiles', 'Self Employed', 'comma separated'],
    ['Allowed Companies', 'Infosys, TCS', 'comma separated'],
    ['Restricted Companies', '', 'comma separated'],
    ['Max DPD', 2, ''],
    ['Allow 90+ DPD', 'No', 'Yes or No'],
    ['Max Active Loans', 1, ''],
    ['Max STPL', 1, ''],
    ['BT Allowed', 'Yes', 'Yes or No'],
    ['Top Up Allowed', 'Yes', 'Yes or No'],
    ['Max BT', 1, ''],
    ['OD BT', 'Yes', 'Yes or No'],
    ['NOC Required', 'Yes', 'Yes or No'],
    ['ROI Category A', 8.5, ''],
    ['ROI Category B', 9.5, ''],
    ['ROI Category C', 10.5, ''],
    ['ROI Category D', 11.5, ''],
    ['Open Market Doable', 'Yes', 'Yes or No'],
    ['Special Notes', '', 'free text'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 24 }, { wch: 22 }, { wch: 40 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Bank Policy');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

module.exports = { parsePolicyExcel, buildPolicyTemplateBuffer };
