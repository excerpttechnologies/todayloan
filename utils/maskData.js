// utils/maskData.js
const maskMobile    = (v='') => !v||v.length<6 ? v : v.slice(0,2)+'XXXX'+v.slice(-4);
const maskAadhaar   = (v='') => { const d=v.replace(/\s|-/g,''); return d.length<4?v:'XXXX-XXXX-'+d.slice(-4); };
const maskPAN       = (v='') => !v||v.length<5 ? v : v.slice(0,2)+'XXX'+v.slice(5,9)+'X';
const maskEmail     = (v='') => { if(!v||!v.includes('@')) return v; const [l,d]=v.split('@'); return l.slice(0,2)+'**@'+d; };
const maskAccountNo = (v='') => !v||v.length<4 ? v : 'XXXXXX'+v.slice(-4);
const maskName      = (v='') => !v ? v : v.split(' ').map(w=>w.length>1?w.charAt(0)+'*'.repeat(w.length-1):w).join(' ');

const applyLeadMask = (lead, isUnlocked=false) => {
  const l = lead.toObject ? lead.toObject() : { ...lead };
  if (isUnlocked) return l;
  if (l.customerName)   l.customerName   = maskName(l.customerName);
  if (l.customerMobile) l.customerMobile = maskMobile(l.customerMobile);
  if (l.altMobile)      l.altMobile      = maskMobile(l.altMobile);
  if (l.email)          l.email          = maskEmail(l.email);
  if (l.officialEmail)  l.officialEmail  = maskEmail(l.officialEmail);
  if (l.aadhaarNumber)  l.aadhaarNumber  = maskAadhaar(l.aadhaarNumber);
  if (l.panNumber)      l.panNumber      = maskPAN(l.panNumber);
  if (l.motherName)     l.motherName     = maskName(l.motherName);
  if (l.fatherName)     l.fatherName     = maskName(l.fatherName);
  if (l.documents)      l.documents._masked = true;
  return l;
};

module.exports = { maskMobile, maskAadhaar, maskPAN, maskEmail, maskAccountNo, maskName, applyLeadMask };
