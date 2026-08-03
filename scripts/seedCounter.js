require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const LoanApplication = require('../models/LoanApplication');
const Counter = require('../models/Counter');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const all = await LoanApplication.find({}, { applicationId: 1 });

  let highest = 0;
  for (const app of all) {
    if (!app.applicationId) continue;
    const match = app.applicationId.match(/(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > highest) highest = num;
    }
  }

  await Counter.findByIdAndUpdate(
    'applicationId',
    { $set: { seq: highest } },
    { upsert: true }
  );

  console.log(`Counter seeded to ${highest}. Next application will be BKL${String(highest + 1).padStart(6, '0')}`);
  await mongoose.disconnect();
})();