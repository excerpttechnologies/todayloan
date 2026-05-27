const express = require('express');
const router = express.Router();
const { protect, requireRole } = require('../middleware/auth');
const upload = require('../config/multer');
const Document = require('../models/Document');

router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const { applicationId, documentType } = req.body;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const doc = await Document.create({ application: applicationId, uploadedBy: req.user._id, documentType, fileName: req.file.filename, originalName: req.file.originalname, filePath: `uploads/${req.file.filename}`, fileUrl: `${baseUrl}/uploads/${req.file.filename}`, fileSize: req.file.size, mimeType: req.file.mimetype });
    res.status(201).json({ success: true, document: doc });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.get('/:applicationId', protect, async (req, res) => {
  try {
    const docs = await Document.find({ application: req.params.applicationId, isActive: true }).populate('uploadedBy','name role');
    res.json({ success: true, documents: docs });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Document.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ success: true, message: 'Document removed' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

router.put('/:id/verify', protect, requireRole('admin','banker'), async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, { isVerified: true, verifiedBy: req.user._id, verifiedAt: new Date(), remarks: req.body.remarks }, { new: true });
    res.json({ success: true, document: doc });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

module.exports = router;
