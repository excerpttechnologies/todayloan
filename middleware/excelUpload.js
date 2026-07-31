const multer = require('multer');

// Bank Policy Excel import uses its own in-memory multer instance.
// Deliberately NOT reusing backend/utils/upload.js (that one is locked to
// image/pdf/mp4 for KYC documents) — this keeps the existing upload flow
// completely untouched.
const excelFileFilter = (req, file, cb) => {
  const allowed = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
  ];
  if (allowed.includes(file.mimetype) || /\.(xlsx|xls)$/i.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error('Only .xlsx or .xls files are allowed'), false);
  }
};

const excelUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: excelFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = excelUpload;
