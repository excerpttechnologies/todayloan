const maskMobile = (mobile) => {
  if (!mobile) return '';
  const m = mobile.replace(/\D/g, '');
  if (m.length < 5) return m;
  return m.substring(0, 2) + 'X'.repeat(m.length - 5) + m.substring(m.length - 3);
};

const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  return local.charAt(0) + '***@' + domain;
};

const maskAadhaar = (aadhaar) => {
  if (!aadhaar) return '';
  const a = aadhaar.replace(/\D/g, '');
  return 'XXXX-XXXX-' + a.substring(a.length - 4);
};

const maskPAN = (pan) => {
  if (!pan) return '';
  const p = pan.toUpperCase();
  if (p.length < 6) return p;
  return p.substring(0, 2) + 'XXX' + p.substring(5);
};

const maskDOB = (dob) => {
  if (!dob) return '';
  const d = new Date(dob);
  return `**/**/${d.getFullYear()}`;
};

const maskSalary = (salary) => {
  if (!salary) return '';
  const lower = Math.floor(salary / 10000) * 10000;
  const upper = lower + 10000;
  return `₹${lower.toLocaleString('en-IN')}–₹${upper.toLocaleString('en-IN')}`;
};

const applyMasking = (application) => {
  const app = application.toObject ? application.toObject() : { ...application };
  if (app.applicantDetails) {
    app.applicantDetails.mobileRaw = app.applicantDetails.mobileMasked;
    app.applicantDetails.aadhaarRaw = app.applicantDetails.aadhaarMasked;
    app.applicantDetails.panRaw = app.applicantDetails.panMasked;
    app.applicantDetails.email = app.applicantDetails.emailMasked;
    app.applicantDetails.dob = app.applicantDetails.dobMasked;
    app.applicantDetails.name = app.applicantDetails.name ? app.applicantDetails.name.charAt(0) + '*** ' + app.applicantDetails.name.split(' ').pop() : '';
  }
  if (app.incomeDetails && app.incomeDetails.netSalary) {
    app.incomeDetails.netSalary = maskSalary(app.incomeDetails.netSalary);
  }
  return app;
};

module.exports = { maskMobile, maskEmail, maskAadhaar, maskPAN, maskDOB, maskSalary, applyMasking };
