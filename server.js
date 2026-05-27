const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static file serving — all uploads ────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Auth & core routes ────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/users',         require('./routes/users'));
app.use('/api/loans',         require('./routes/loans'));
app.use('/api/banks',         require('./routes/banks'));
app.use('/api/leads',         require('./routes/leads'));
app.use('/api/documents',     require('./routes/documents'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/commissions',   require('./routes/commissions'));
app.use('/api/analytics',     require('./routes/analytics'));

// ── V2 role-specific routes ───────────────────────────────────────
app.use('/api/connector', require('./routes/connector'));
app.use('/api/banker',    require('./routes/banker'));
app.use('/api/admin',     require('./routes/adminV2'));

// ── Health check ──────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Today Loan API V2 running', timestamp: new Date() });
});


// frontend dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});



// ── Global error handler ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// ── Connect DB & start ────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
