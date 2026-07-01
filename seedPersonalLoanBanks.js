// seedPersonalLoanBanks.js
// One-time script: replaces the entire personal‑loan bank list with the official 37 banks.
// Run with:  node seedPersonalLoanBanks.js

require('dotenv').config();
const mongoose = require('mongoose');
const Bank = require('./models/Bank');

// All loan types – every bank gets the full list
const ALL_LOAN_TYPES = [
  'Personal Loan',
  'Business Loan',
  'Home Loan',
  'Mortgage Loan / LAP',
  'Construction Loan',
  'Home Renovation Loan',
  'Site Purchase Loan',
  'Site & Construction Loan',
  'Car Loan',
  'Commercial Vehicle Loan',
  'Industrial Loan',
  'Projects Loan',
  'Education Loan',
];

// The definitive list of 37 Personal Loan banks (exactly as provided)
const BANKS_TO_SEED = [
  { bankName: 'ADITYA BIRLA', dsaCode: 'DAUMUM03410' },
  { bankName: 'ADITYA BIRLA OD', dsaCode: 'DAUMUM03410' },
  { bankName: 'AXIS BANK', dsaCode: 'DSA12594MUM' },
  { bankName: 'AXIS FINANCE - Normal Personal Loan', dsaCode: 'AFLR1163' },
  { bankName: 'Axis Finance (Cat C,D &U) TERM Loan', dsaCode: 'AFLR1163' },
  { bankName: 'Bajaj Finserve (Prime)', dsaCode: '199445' },
  { bankName: 'BAJAJ GROWTH (PF 1.40% Mandatory)', dsaCode: '199445' },
  { bankName: 'BAJAJ GROWTH MTS (PF)', dsaCode: '199445' },
  { bankName: 'BAJAJ FINSERVE (Market) (PPL)', dsaCode: '' },
  { bankName: 'BANDHAN BANK', dsaCode: '900175' },
  { bankName: 'CHOLA MANDALAM', dsaCode: 'BLPIFF019' },
  { bankName: 'CHOLA MANDALAM - OD', dsaCode: 'BLPIFF019' },
  { bankName: 'FINNABLE', dsaCode: '54708103' },
  { bankName: 'SMFG (Emerging)', dsaCode: 'MA048' },
  { bankName: 'SMFG INDIA (METRO)', dsaCode: 'MA048' },
  { bankName: 'SMFG INDIA top-up', dsaCode: 'MA048' },
  { bankName: 'HDFC BANK', dsaCode: 'MA048' },
  { bankName: 'ICICI BANK - PL', dsaCode: '250115' },
  { bankName: 'ICICI BANK AWS', dsaCode: '66559' },
  { bankName: 'IDFC FIRST BANK', dsaCode: '66559' },
  { bankName: 'INCREED (01.01.2026)', dsaCode: '66559' },
  { bankName: 'INDUSIND BANK - GOVT (NTH>75000)', dsaCode: 'CORP30314' },
  { bankName: 'INDUSIND BANK - PL (CAT A-C1000/CAT C WITH NTH >50,000)', dsaCode: 'CORP30314' },
  { bankName: 'INDUSIND BANK - PL (CAT-C1000/CAT C WITH NTH <50000)', dsaCode: 'CORP30314' },
  { bankName: 'INDUSIND BANK VPL', dsaCode: 'CORP3031' },
  { bankName: 'KOTAK BANK', dsaCode: '304585340' },
  { bankName: 'KOTAK MAHINDRA - FRESH OVER DRAFT', dsaCode: '304585340' },
  { bankName: 'L&T', dsaCode: 'DSA09216' },
  { bankName: 'MASS FINANCE', dsaCode: '' },
  { bankName: 'PIRAMAL CAPITAL', dsaCode: 'DAPUN00445' },
  { bankName: 'POONAWALA', dsaCode: 'CP0112' },
  { bankName: 'TATA CAPITAL', dsaCode: '8075394' },
  { bankName: 'TATA CAPITAL (OverDraft)', dsaCode: '8075394' },
  { bankName: 'YES BANK', dsaCode: '' },
  { bankName: 'WERIZE', dsaCode: '8217780608' },
  { bankName: 'HDB', dsaCode: '' },
  { bankName: 'FIBE', dsaCode: '' },
].map(b => ({
  ...b,
  supportedLoanTypes: ALL_LOAN_TYPES,
  status: 'active',
}));

// Extract the bank names for deletion (to replace the whole list)
const bankNamesToReplace = BANKS_TO_SEED.map(b => b.bankName);

async function run() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ No MONGO_URI / MONGODB_URI found in .env');
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB');

  // 1. Remove old demo banks (optional, but safe)
  const demoNames = ['HDFC Bank', 'Demo Bank', 'Test Bank'];
  const delDemo = await Bank.deleteMany({ bankName: { $in: demoNames } });
  console.log(`🧹 Removed ${delDemo.deletedCount} demo bank(s)`);

  // 2. Delete *all* existing banks that are in our seed list (to avoid duplicates)
  const delResult = await Bank.deleteMany({ bankName: { $in: bankNamesToReplace } });
  console.log(`🗑️  Removed ${delResult.deletedCount} old bank(s) from the seed list`);

  // 3. Insert the fresh list
  const inserted = await Bank.insertMany(BANKS_TO_SEED);
  console.log(`✅ Inserted ${inserted.length} banks (out of ${BANKS_TO_SEED.length})`);

  // 4. Verify count
  const finalCount = await Bank.countDocuments({ bankName: { $in: bankNamesToReplace } });
  console.log(`📊 Total banks in DB now: ${await Bank.countDocuments()}`);
  console.log(`📋 Personal‑loan banks present: ${finalCount}`);

  await mongoose.disconnect();
  console.log('🎉 Done.');
}

run().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});