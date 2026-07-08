// // const maskMobile = (mobile) => {










// //   if (!mobile) return '';
// //   const m = mobile.replace(/\D/g, '');
// //   if (m.length < 5) return m;
// //   return m.substring(0, 2) + 'X'.repeat(m.length - 5) + m.substring(m.length - 3);
// // };

// // const maskEmail = (email) => {
// //   if (!email) return '';
// //   const [local, domain] = email.split('@');
// //   if (!domain) return email;
// //   return local.charAt(0) + '***@' + domain;
// // };

// // const maskAadhaar = (aadhaar) => {
// //   if (!aadhaar) return '';
// //   const a = aadhaar.replace(/\D/g, '');
// //   return 'XXXX-XXXX-' + a.substring(a.length - 4);
// // };

// // const maskPAN = (pan) => {
// //   if (!pan) return '';
// //   const p = pan.toUpperCase();
// //   if (p.length < 6) return p;
// //   return p.substring(0, 2) + 'XXX' + p.substring(5);
// // };

// // const maskDOB = (dob) => {
// //   if (!dob) return '';
// //   const d = new Date(dob);
// //   return `**/**/${d.getFullYear()}`;
// // };

// // const maskSalary = (salary) => {
// //   if (!salary) return '';
// //   const lower = Math.floor(salary / 10000) * 10000;
// //   const upper = lower + 10000;
// //   return `₹${lower.toLocaleString('en-IN')}–₹${upper.toLocaleString('en-IN')}`;
// // };

// // const applyMasking = (application) => {
// //   const app = application.toObject ? application.toObject() : { ...application };
// //   if (app.applicantDetails) {
    
// //     app.applicantDetails.mobileRaw = app.applicantDetails.mobileMasked;
// //     app.applicantDetails.aadhaarRaw = app.applicantDetails.aadhaarMasked;
// //     app.applicantDetails.panRaw = app.applicantDetails.panMasked;
// //     app.applicantDetails.email = app.applicantDetails.emailMasked;
// //     app.applicantDetails.dob = app.applicantDetails.dobMasked;
// //     app.applicantDetails.name = app.applicantDetails.name ? app.applicantDetails.name.charAt(0) + '*** ' + app.applicantDetails.name.split(' ').pop() : '';
// //   }
// //   if (app.incomeDetails && app.incomeDetails.netSalary) {
// //     app.incomeDetails.netSalary = maskSalary(app.incomeDetails.netSalary);
// //   }
// //   return app;
// // };

// // module.exports = { maskMobile, maskEmail, maskAadhaar, maskPAN, maskDOB, maskSalary, applyMasking };



// // utils/masking.js

// const maskMobile = (mobile) => {
//   if (!mobile) return '';
//   const m = mobile.replace(/\D/g, '');
//   if (m.length < 5) return m;
//   return m.substring(0, 2) + 'X'.repeat(m.length - 5) + m.substring(m.length - 3);
// };

// const maskEmail = (email) => {
//   if (!email) return '';
//   const [local, domain] = email.split('@');
//   if (!domain) return email;
//   return local.charAt(0) + '***@' + domain;
// };

// const maskAadhaar = (aadhaar) => {
//   if (!aadhaar) return '';
//   const a = aadhaar.replace(/\D/g, '');
//   return 'XXXX-XXXX-' + a.substring(a.length - 4);
// };

// const maskPAN = (pan) => {
//   if (!pan) return '';
//   const p = pan.toUpperCase();
//   if (p.length < 6) return p;
//   return p.substring(0, 2) + 'XXX' + p.substring(5);
// };

// const maskDOB = (dob) => {
//   if (!dob) return '';
//   const d = new Date(dob);
//   return `**/**/${d.getFullYear()}`;
// };

// const maskSalary = (salary) => {
//   if (!salary) return '';
//   const lower = Math.floor(salary / 10000) * 10000;
//   const upper = lower + 10000;
//   return `₹${lower.toLocaleString('en-IN')}–₹${upper.toLocaleString('en-IN')}`;
// };

// const applyMasking = (application) => {
//   // Convert to plain object
//   const app = application.toObject ? application.toObject() : { ...application };
  
//   if (app.applicantDetails) {
//     // ✅ Store original unmasked values in raw fields
//     app.applicantDetails.mobileRaw = app.applicantDetails.mobile;
//     app.applicantDetails.aadhaarRaw = app.applicantDetails.aadhaar;
//     app.applicantDetails.panRaw = app.applicantDetails.pan;
//     app.applicantDetails.emailRaw = app.applicantDetails.email;
//     app.applicantDetails.dobRaw = app.applicantDetails.dob;
//     app.applicantDetails.nameRaw = app.applicantDetails.name;
    
//     // ✅ Replace with masked values for display
//     app.applicantDetails.mobile = maskMobile(app.applicantDetails.mobile);
//     app.applicantDetails.aadhaar = maskAadhaar(app.applicantDetails.aadhaar);
//     app.applicantDetails.pan = maskPAN(app.applicantDetails.pan);
//     app.applicantDetails.email = maskEmail(app.applicantDetails.email);
//     app.applicantDetails.dob = maskDOB(app.applicantDetails.dob);
    
//     // Mask name: first letter + *** + last name
//     if (app.applicantDetails.name) {
//       const nameParts = app.applicantDetails.name.split(' ');
//       if (nameParts.length > 1) {
//         app.applicantDetails.name = nameParts[0].charAt(0) + '*** ' + nameParts.pop();
//       } else {
//         app.applicantDetails.name = app.applicantDetails.name.charAt(0) + '***';
//       }
//     }
//   }
  
//   if (app.incomeDetails && app.incomeDetails.netSalary) {
//     app.incomeDetails.netSalary = maskSalary(app.incomeDetails.netSalary);
//   }
  
//   return app;
// };

// module.exports = { 
//   maskMobile, 
//   maskEmail, 
//   maskAadhaar, 
//   maskPAN, 
//   maskDOB, 
//   maskSalary, 
//   applyMasking 
// };



// utils/masking.js

// const maskMobile = (mobile) => {
//   if (!mobile) return '';
//   const m = mobile.replace(/\D/g, '');
//   if (m.length < 5) return m;
//   return m.substring(0, 2) + 'X'.repeat(m.length - 5) + m.substring(m.length - 3);
// };

// const maskEmail = (email) => {
//   if (!email) return '';
//   const [local, domain] = email.split('@');
//   if (!domain) return email;
//   return local.charAt(0) + '***@' + domain;
// };

// const maskAadhaar = (aadhaar) => {
//   if (!aadhaar) return '';
//   const a = aadhaar.replace(/\D/g, '');
//   if (a.length < 4) return a;
//   return 'XXXX-XXXX-' + a.substring(a.length - 4);
// };

// const maskPAN = (pan) => {
//   if (!pan) return '';
//   const p = pan.toUpperCase();
//   if (p.length < 6) return p;
//   return p.substring(0, 2) + 'XXX' + p.substring(5);
// };

// const maskDOB = (dob) => {
//   if (!dob) return '';
//   const d = new Date(dob);
//   return `**/**/${d.getFullYear()}`;
// };

// const maskSalary = (salary) => {
//   if (!salary) return '';
//   const num = Number(salary);
//   if (isNaN(num) || num === 0) return '';
//   const lower = Math.floor(num / 10000) * 10000;
//   const upper = lower + 10000;
//   return `₹${lower.toLocaleString('en-IN')}–₹${upper.toLocaleString('en-IN')}`;
// };

// const applyMasking = (application) => {
//   const app = application.toObject ? application.toObject() : { ...application };
  
//   if (app.applicantDetails) {
//     // 🔥 CRITICAL: Use the masked fields from database
//     // If masked fields exist, use them; otherwise generate them
//     const mobile = app.applicantDetails.mobile || '';
//     const email = app.applicantDetails.email || '';
//     const aadhaar = app.applicantDetails.aadhaar || '';
//     const pan = app.applicantDetails.pan || '';
//     const dob = app.applicantDetails.dob || '';
    
//     // Store original values in raw fields
//     app.applicantDetails.mobileRaw = mobile;
//     app.applicantDetails.emailRaw = email;
//     app.applicantDetails.aadhaarRaw = aadhaar;
//     app.applicantDetails.panRaw = pan;
//     app.applicantDetails.dobRaw = dob;
//     app.applicantDetails.nameRaw = app.applicantDetails.name || '';
    
//     // Replace with masked values for display
//     app.applicantDetails.mobile = app.applicantDetails.mobileMasked || maskMobile(mobile);
//     app.applicantDetails.email = app.applicantDetails.emailMasked || maskEmail(email);
//     app.applicantDetails.aadhaar = app.applicantDetails.aadhaarMasked || maskAadhaar(aadhaar);
//     app.applicantDetails.pan = app.applicantDetails.panMasked || maskPAN(pan);
//     app.applicantDetails.dob = app.applicantDetails.dobMasked || maskDOB(dob);
    
//     // Mask name
//     if (app.applicantDetails.name) {
//       const nameParts = app.applicantDetails.name.split(' ');
//       if (nameParts.length > 1) {
//         app.applicantDetails.name = nameParts[0].charAt(0) + '*** ' + nameParts.pop();
//       } else {
//         app.applicantDetails.name = app.applicantDetails.name.charAt(0) + '***';
//       }
//     }
//   }
  
//   if (app.incomeDetails && app.incomeDetails.netSalary) {
//     app.incomeDetails.netSalary = maskSalary(app.incomeDetails.netSalary);
//   }
  
//   return app;
// };

// module.exports = { 
//   maskMobile, 
//   maskEmail, 
//   maskAadhaar, 
//   maskPAN, 
//   maskDOB, 
//   maskSalary, 
//   applyMasking 
// };




// // utils/masking.js

// const maskMobile = (mobile) => {
//   if (!mobile) return '';
//   const m = mobile.replace(/\D/g, '');
//   if (m.length < 5) return m;
//   return m.substring(0, 2) + 'X'.repeat(m.length - 5) + m.substring(m.length - 3);
// };

// const maskEmail = (email) => {
//   if (!email) return '';
//   const [local, domain] = email.split('@');
//   if (!domain) return email;
//   return local.charAt(0) + '***@' + domain;
// };

// const maskAadhaar = (aadhaar) => {
//   if (!aadhaar) return '';
//   const a = aadhaar.replace(/\D/g, '');
//   if (a.length < 4) return a;
//   // Show only last 4 digits
//   // return 'XXXX-XXXX-' + a.substring(a.length - 4);
//    return a.substring(0, 2) + 'X'.repeat(a.length - 5) + a.substring(a.length - 3);
// };

// const maskPAN = (pan) => {
//   if (!pan) return '';
//   const p = pan.toUpperCase();
//   if (p.length < 6) return p;
//   // Show first 2 and last 2 characters
//   return p.substring(0, 2) + 'XXX' + p.substring(5);
// };

// const maskDOB = (dob) => {
//   if (!dob) return '';
//   const d = new Date(dob);
//   return `**/**/${d.getFullYear()}`;
// };

// const maskName = (name) => {
//   if (!name) return '';
//   const parts = name.trim().split(' ');
//   if (parts.length > 1) {
//     return parts[0].charAt(0) + '*** ' + parts[parts.length - 1];
//   }
//   return name.charAt(0) + '***';
// };

// const maskSalary = (salary) => {
//   if (!salary) return '';
//   const num = Number(salary);
//   if (isNaN(num) || num === 0) return '';
//   const lower = Math.floor(num / 10000) * 10000;
//   const upper = lower + 10000;
//   return `₹${lower.toLocaleString('en-IN')}–₹${upper.toLocaleString('en-IN')}`;
// };



// const applyMasking = (application) => {
//   const app = application.toObject ? application.toObject() : { ...application };
  
//   if (app.applicantDetails) {
//     // ✅ Store original values in raw fields
//     app.applicantDetails.mobileRaw = app.applicantDetails.mobile || '';
//     app.applicantDetails.emailRaw = app.applicantDetails.email || '';
//     app.applicantDetails.aadhaarRaw = app.applicantDetails.aadhaar || '';
//     app.applicantDetails.panRaw = app.applicantDetails.pan || '';
//     app.applicantDetails.dobRaw = app.applicantDetails.dob || '';
//     app.applicantDetails.nameRaw = app.applicantDetails.name || '';
    
//     // ✅ Apply masking to all fields
//     app.applicantDetails.mobile = maskMobile(app.applicantDetails.mobile);
//     app.applicantDetails.email = maskEmail(app.applicantDetails.email);
//     app.applicantDetails.aadhaar = maskAadhaar(app.applicantDetails.aadhaar);  // 🔥 FIXED
//     app.applicantDetails.pan = maskPAN(app.applicantDetails.pan);
//     app.applicantDetails.dob = maskDOB(app.applicantDetails.dob);
    
  
    
//     // Mask name
//     if (app.applicantDetails.name) {
//       const nameParts = app.applicantDetails.name.split(' ');
//       if (nameParts.length > 1) {
//         app.applicantDetails.name = nameParts[0].charAt(0) + '*** ' + nameParts.pop();
//       } else {
//         app.applicantDetails.name = app.applicantDetails.name.charAt(0) + '***';
//       }
//     }
//   }
  
//   if (app.incomeDetails && app.incomeDetails.netSalary) {
//     app.incomeDetails.netSalary = maskSalary(app.incomeDetails.netSalary);
//   }
  
//   return app;
// };

// module.exports = { 
//   maskMobile, 
//   maskEmail, 
//   maskAadhaar, 
//   maskPAN, 
//   maskDOB, 
//   maskSalary, 
//   maskName, 
//   applyMasking 
// };












// utils/masking.js

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
  if (a.length < 4) return a;
  // Show only last 4 digits
  // return 'XXXX-XXXX-' + a.substring(a.length - 4);
   return a.substring(0, 2) + 'X'.repeat(a.length - 5) + a.substring(a.length - 3);
};

const maskPAN = (pan) => {
  if (!pan) return '';
  const p = pan.toUpperCase();
  if (p.length < 6) return p;
  // Show first 2 and last 2 characters
  return p.substring(0, 2) + 'XXX' + p.substring(5);
};

const maskDOB = (dob) => {
  if (!dob) return '';
  const d = new Date(dob);
  return `**/**/${d.getFullYear()}`;
};

const maskName = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length > 1) {
    return parts[0].charAt(0) + '*** ' + parts[parts.length - 1];
  }
  return name.charAt(0) + '***';
};

const maskSalary = (salary) => {
  if (!salary) return '';
  const num = Number(salary);
  if (isNaN(num) || num === 0) return '';
  const lower = Math.floor(num / 10000) * 10000;
  const upper = lower + 10000;
  return `₹${lower.toLocaleString('en-IN')}–₹${upper.toLocaleString('en-IN')}`;
};



const applyMasking = (application) => {
  const app = application.toObject ? application.toObject() : { ...application };

  if (app.applicantDetails) {
    // Store original values in raw fields (kept as-is for reference/audit)
    app.applicantDetails.mobileRaw = app.applicantDetails.mobile || '';
    app.applicantDetails.emailRaw = app.applicantDetails.email || '';
    app.applicantDetails.aadhaarRaw = app.applicantDetails.aadhaar || '';
    app.applicantDetails.panRaw = app.applicantDetails.pan || '';
    
    app.applicantDetails.nameRaw = app.applicantDetails.name || '';

    // ✅ ONLY mask PAN, Aadhaar, and Mobile.
    // Name, email, and DOB are shown as-is (not masked) before bank selection.
    app.applicantDetails.mobile = maskMobile(app.applicantDetails.mobile);
    app.applicantDetails.aadhaar = maskAadhaar(app.applicantDetails.aadhaar);
    app.applicantDetails.pan = maskPAN(app.applicantDetails.pan);

    // ❌ Name masking removed — applicant name is always shown unmasked.
    // ❌ Email masking removed — not required per masking scope.
    // ❌ DOB masking removed — not required per masking scope.
  }

  if (app.incomeDetails && app.incomeDetails.netSalary) {
    app.incomeDetails.netSalary = maskSalary(app.incomeDetails.netSalary);
  }

  return app;
};

module.exports = {
  applyMasking,
  maskMobile,
  maskEmail,
  maskAadhaar,
  maskPAN,
  maskDOB,
  maskSalary,
  maskName,
  
};