const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const UPLOAD_BASE = path.join(__dirname, '../uploads');

const FOLDER_MAP = {
  'pan-cards': 'pan-cards',
  'aadhaar-cards': 'aadhaar-cards',
  'payslips': 'payslips',
  'bank-statements': 'bank-statements',
  'photos': 'photos',
  'form16': 'form16',
  'sale-deeds': 'sale-deeds',
  'property-docs': 'property-docs',
  'sanction-letters': 'sanction-letters',
  'others': 'others'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query.folder || req.body.folder || 'others';
    const dest = path.join(UPLOAD_BASE, FOLDER_MAP[folder] || 'others');
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}-${Date.now()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg','image/jpg','image/png','application/pdf','video/mp4'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Invalid file type. Only JPEG, PNG, PDF, MP4 allowed.'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;
