require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const { setIO } = require('./utils/notifications');
const LoanApplication = require('./models/LoanApplication');
const { sendNotification } = require('./utils/notifications');
const Connector = require('./models/Connector');


const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', methods: ['GET','POST'] }
});

setIO(io);

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests' });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, message: 'Too many auth attempts' });
app.use('/api/v1/auth', authLimiter);
app.use('/api/v1', limiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1', require('./routes/index'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));



// Serve React Dist Folder
app.use(express.static(path.join(__dirname, "dist")));

// React Router Support
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



// Socket.io
io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} connected`);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// TAT Monitoring Cron (every 15 minutes)
cron.schedule('*/15 * * * *', async () => {
  try {
    const SLA = {
      'under_review': 15 * 60 * 1000,
      'verification': 4 * 60 * 60 * 1000,
      'credit_review': 24 * 60 * 60 * 1000,
      'sanctioned': 48 * 60 * 60 * 1000,
    };
    const apps = await LoanApplication.find({ overallStatus: 'active' });
    for (const app of apps) {
      for (const ba of app.bankAssignments) {
        if (SLA[ba.status] && !ba.tatBreached) {
          const lastUpdate = ba.statusHistory[ba.statusHistory.length - 1]?.changedAt || app.createdAt;
          if (Date.now() - new Date(lastUpdate).getTime() > SLA[ba.status]) {
            ba.tatBreached = true;
            const connector = await Connector.findById(app.connectorId);
            if (connector?.userId) {
              await sendNotification(connector.userId, 'TAT Breached', `${ba.bankName} has breached SLA for ${app.applicationId}`, 'general', app._id);
            }
          }
        }
      }
      await app.save();
    }
  } catch (err) {
    console.error('TAT cron error:', err);
  }
});

// MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bankzone')
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});
