// // middleware/upload.js
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/documents"),
//   filename: (req, file, cb) => {
//     const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${unique}${path.extname(file.originalname)}`);
//   },
// });

// module.exports = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });








const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query.folder || 'others';
    const dir = path.join('uploads', folder);
    fs.mkdirSync(dir, { recursive: true }); // create it if it doesn't exist yet
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});