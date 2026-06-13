require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Bank = require('./models/Bank');
const Company = require('./models/Company');
const Connector = require('./models/Connector');
const LoanApplication = require('./models/LoanApplication');

const LOAN_TYPES = ['Personal Loan','Business Loan','Home Loan','Mortgage Loan / LAP','Construction Loan','Home Renovation Loan','Site Purchase Loan','Site & Construction Loan','Car Loan','Commercial Vehicle Loan','Industrial Loan','Projects Loan','Education Loan'];

const BANKS_DATA = [
  { name: 'Aditya Birla', dsaCode: 'DAUMUM03410', loans: ['Personal Loan','Business Loan'] },
  { name: 'Aditya Birla OD', dsaCode: 'DAUMUM03410', loans: ['Business Loan','Mortgage Loan / LAP'] },
  { name: 'Axis Bank', dsaCode: 'DSA12594MUM', loans: ['Personal Loan','Home Loan','Car Loan','Business Loan'] },
  { name: 'Axis Finance (Normal PL)', dsaCode: 'AFLR1163', loans: ['Personal Loan'] },
  { name: 'Axis Finance (Cat C,D&U Term Loan)', dsaCode: 'AFLR1163', loans: ['Business Loan','Mortgage Loan / LAP'] },
  { name: 'Bajaj Finserv (Prime)', dsaCode: '199445', loans: ['Personal Loan','Business Loan','Home Loan'] },
  { name: 'Bajaj Growth (PF 1.40%)', dsaCode: '199445', loans: ['Personal Loan','Business Loan'] },
  { name: 'Bajaj Growth MTS', dsaCode: '199445', loans: ['Personal Loan'] },
  { name: 'Bajaj Finserv (Market PPL)', dsaCode: '199445', loans: ['Personal Loan','Business Loan'] },
  { name: 'Bandhan Bank', dsaCode: '900175', loans: ['Personal Loan','Business Loan','Home Loan','Education Loan'] },
  { name: 'Chola Mandalam', dsaCode: 'BLPIFF019', loans: ['Business Loan','Car Loan','Commercial Vehicle Loan','Mortgage Loan / LAP'] },
  { name: 'Chola Mandalam OD', dsaCode: 'BLPIFF019', loans: ['Business Loan','Mortgage Loan / LAP'] },
  { name: 'Finnable', dsaCode: '54708103', loans: ['Personal Loan','Business Loan'] },
  { name: 'SMFG India (Emerging)', dsaCode: 'MA048', loans: ['Business Loan','Personal Loan'] },
  { name: 'SMFG India (Metro)', dsaCode: 'MA048', loans: ['Business Loan','Personal Loan'] },
  { name: 'SMFG India Top-Up', dsaCode: 'MA048', loans: ['Personal Loan','Business Loan'] },
  { name: 'HDFC Bank', dsaCode: 'MA048', loans: LOAN_TYPES },
  { name: 'ICICI Bank PL', dsaCode: '250115', loans: ['Personal Loan'] },
  { name: 'ICICI Bank AWS', dsaCode: '66559', loans: ['Personal Loan','Business Loan','Home Loan'] },
  { name: 'IDFC First Bank', dsaCode: '66559', loans: ['Personal Loan','Business Loan','Home Loan','Car Loan'] },
  { name: 'Incred', dsaCode: '66559', loans: ['Personal Loan','Business Loan','Education Loan'] },
  { name: 'IndusInd Bank (Govt NTH>75000)', dsaCode: 'CORP30314', loans: ['Personal Loan'] },
  { name: 'IndusInd Bank PL (Cat A-C1000 NTH>50000)', dsaCode: 'CORP30314', loans: ['Personal Loan'] },
  { name: 'IndusInd Bank PL (Cat C1000 NTH<50000)', dsaCode: 'CORP30314', loans: ['Personal Loan'] },
  { name: 'IndusInd Bank VPL', dsaCode: 'CORP3031', loans: ['Personal Loan','Car Loan'] },
  { name: 'Kotak Bank', dsaCode: '304585340', loans: ['Personal Loan','Business Loan','Home Loan','Car Loan'] },
  { name: 'Kotak Mahindra Fresh OD', dsaCode: '304585340', loans: ['Business Loan','Mortgage Loan / LAP'] },
  { name: 'L&T Finance', dsaCode: 'DSA09216', loans: ['Home Loan','Car Loan','Commercial Vehicle Loan','Business Loan'] },
  { name: 'Mass Finance', dsaCode: '', loans: ['Personal Loan','Business Loan'] },
  { name: 'Piramal Capital', dsaCode: 'DAPUN00445', loans: ['Home Loan','Mortgage Loan / LAP','Construction Loan'] },
  { name: 'Poonawala Finance', dsaCode: 'CP0112', loans: ['Personal Loan','Business Loan'] },
  { name: 'Tata Capital', dsaCode: '8075394', loans: ['Personal Loan','Business Loan','Home Loan','Car Loan','Education Loan'] },
  { name: 'Tata Capital OD', dsaCode: '8075394', loans: ['Business Loan','Mortgage Loan / LAP'] },
  { name: 'Yes Bank', dsaCode: '', loans: ['Personal Loan','Business Loan','Home Loan'] },
  { name: 'Werize', dsaCode: '8217780608', loans: ['Personal Loan','Business Loan'] },
  { name: 'HDB Financial', dsaCode: '', loans: ['Personal Loan','Business Loan','Car Loan','Commercial Vehicle Loan'] },
  { name: 'Fibe', dsaCode: '', loans: ['Personal Loan','Education Loan'] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bankzone');
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([User.deleteMany({}), Bank.deleteMany({}), Company.deleteMany({}), Connector.deleteMany({}), LoanApplication.deleteMany({})]);
  console.log('Cleared existing data');

  // Admin
  const admin = await User.create({ role: 'admin', name: 'Admin', email: 'admin@bankzone.com', mobile: '9999999999', password: 'Admin@123' });
  console.log('✅ Admin created: admin@bankzone.com / Admin@123');

  // Banks
  for (const b of BANKS_DATA) {
    await Bank.create({ bankName: b.name, dsaCode: b.dsaCode, supportedLoanTypes: b.loans, status: 'active' });
  }
  console.log(`✅ ${BANKS_DATA.length} banks seeded`);

  // Sample Companies
  const companyUser1 = await User.create({ role: 'company', name: 'FinConnect DSA', email: 'company1@bankzone.com', mobile: '9876543210', password: 'Company@123' });
  const company1 = await Company.create({ userId: companyUser1._id, companyName: 'FinConnect DSA Services', registrationNumber: 'MH-2020-12345', gstNumber: '27AABCF1234A1Z5', address: 'Shop 12, Finance Plaza, Andheri West', city: 'Mumbai', pincode: '400058', email: 'company1@bankzone.com', mobile: '9876543210' });

  const companyUser2 = await User.create({ role: 'company', name: 'LoanBridge India', email: 'company2@bankzone.com', mobile: '9876543211', password: 'Company@123' });
  const company2 = await Company.create({ userId: companyUser2._id, companyName: 'LoanBridge India Pvt Ltd', registrationNumber: 'KA-2019-67890', gstNumber: '29AABCL9876B1Z3', address: 'Office 5, Tech Park, Whitefield', city: 'Bengaluru', pincode: '560066', email: 'company2@bankzone.com', mobile: '9876543211' });
  console.log('✅ 2 sample companies created: company1@bankzone.com / Company@123, company2@bankzone.com / Company@123');

  // Sample Connectors
  const connUser1 = await User.create({ role: 'connector', name: 'Rajesh Kumar', email: 'connector1@bankzone.com', mobile: '9812345678', password: 'Connector@123' });
  const conn1 = await Connector.create({ userId: connUser1._id, name: 'Rajesh Kumar', mobile: '9812345678', email: 'connector1@bankzone.com', companyRelations: [{ companyId: company1._id, status: 'approved', joinedAt: new Date() }] });

  const connUser2 = await User.create({ role: 'connector', name: 'Priya Sharma', email: 'connector2@bankzone.com', mobile: '9823456789', password: 'Connector@123' });
  const conn2 = await Connector.create({ userId: connUser2._id, name: 'Priya Sharma', mobile: '9823456789', email: 'connector2@bankzone.com', companyRelations: [{ companyId: company2._id, status: 'approved', joinedAt: new Date() }] });

  const connUser3 = await User.create({ role: 'connector', name: 'Mohammed Ali', email: 'connector3@bankzone.com', mobile: '9834567890', password: 'Connector@123' });
  const conn3 = await Connector.create({ userId: connUser3._id, name: 'Mohammed Ali', mobile: '9834567890', email: 'connector3@bankzone.com', companyRelations: [{ companyId: company1._id, status: 'approved', joinedAt: new Date() }] });
  console.log('✅ 3 sample connectors created: connector1/2/3@bankzone.com / Connector@123');

  // Update company relations
  await Company.findByIdAndUpdate(company1._id, { connectorRelations: [{ connectorId: conn1._id, status: 'approved', joinedAt: new Date() }, { connectorId: conn3._id, status: 'approved', joinedAt: new Date() }] });
  await Company.findByIdAndUpdate(company2._id, { connectorRelations: [{ connectorId: conn2._id, status: 'approved', joinedAt: new Date() }] });

  // Bank user
  const bankUser1 = await User.create({ role: 'bank', name: 'HDFC DSA Manager', email: 'bank1@bankzone.com', mobile: '9845678901', password: 'Bank@123' });
  const hdfc = await Bank.findOne({ bankName: 'HDFC Bank' });
  if (hdfc) {
    hdfc.userId = bankUser1._id;
    hdfc.email = 'bank1@bankzone.com';
    hdfc.mobile = '9845678901';
    hdfc.companyRelations = [{ companyId: company1._id, status: 'approved', joinedAt: new Date() }];
    await hdfc.save();
    await Company.findByIdAndUpdate(company1._id, { $push: { bankingRelations: { bankId: hdfc._id, status: 'approved', joinedAt: new Date() } } });
  }
  console.log('✅ Bank user created: bank1@bankzone.com / Bank@123');

  // SM user
  const smUser = await User.create({ role: 'sm', name: 'Amit Verma (SM)', email: 'sm1@bankzone.com', mobile: '9856789012', password: 'SM@123' });
  if (hdfc) {
    hdfc.salesManagers.push({ smId: smUser._id, name: 'Amit Verma', email: 'sm1@bankzone.com', employeeId: 'HDFC-SM-001', assignedLoanTypes: ['Personal Loan','Business Loan','Home Loan'], status: 'active' });
    await hdfc.save();
  }
  console.log('✅ SM created: sm1@bankzone.com / SM@123');

  // Sample Loan Applications
  const axisBank = await Bank.findOne({ bankName: 'Axis Bank' });
  const icici = await Bank.findOne({ bankName: 'ICICI Bank PL' });

  const app1 = await LoanApplication.create({
    connectorId: conn1._id,
    companyId: company1._id,
    loanType: 'Personal Loan',
    loanAmount: 500000,
    loanPurpose: 'Home Renovation',
    applicantDetails: {
      name: 'Suresh Patel',
      mobileRaw: '9812345001',
      mobileMasked: '98XXXXX001',
      email: 's***@gmail.com',
      emailMasked: 's***@gmail.com',
      dob: new Date('1985-06-15'),
      dobMasked: '**/**/1985',
      aadhaarRaw: '234567890123',
      aadhaarMasked: 'XXXX-XXXX-0123',
      panRaw: 'ABCDE1234F',
      panMasked: 'ABXXX1234F',
      presentAddress: '123 MG Road, Pune',
      presentPincode: '411001',
      presentProperty: 'Rented',
      permanentAddress: '456 Station Road, Pune',
      permanentProperty: 'Owned',
      maritalStatus: 'Married',
      qualification: 'Graduate',
      motherName: 'Savita Patel',
      fatherName: 'Harish Patel'
    },
    incomeDetails: { employmentType: 'Salaried', companyName: 'TCS Ltd', companyCategory: 'A', netSalary: 65000, grossSalary: 80000, salaryMode: 'Account Transfer', designation: 'Senior Engineer', doj: '2019-03', totalExperience: 8 },
    cibilScore: 742,
    bankAssignments: [
      { bankId: hdfc?._id, bankName: 'HDFC Bank', smId: smUser._id, smName: 'Amit Verma', status: 'under_review', statusHistory: [{ status: 'submitted', changedByName: 'Rajesh Kumar', changedAt: new Date(Date.now() - 2*24*60*60*1000), notes: 'Application submitted' }, { status: 'under_review', changedByName: 'Amit Verma', changedAt: new Date(Date.now() - 1*24*60*60*1000), notes: 'Under review' }] },
      ...(axisBank ? [{ bankId: axisBank._id, bankName: 'Axis Bank', status: 'accepted', statusHistory: [{ status: 'submitted', changedByName: 'Rajesh Kumar', changedAt: new Date(Date.now() - 2*24*60*60*1000) }, { status: 'accepted', changedByName: 'Axis SM', changedAt: new Date() }] }] : [])
    ]
  });

  const app2 = await LoanApplication.create({
    connectorId: conn2._id,
    companyId: company2._id,
    loanType: 'Business Loan',
    loanAmount: 2000000,
    loanPurpose: 'Business Expansion',
    applicantDetails: { name: 'Neha Gupta', mobileRaw: '9823456002', mobileMasked: '98XXXXX002', email: 'n***@gmail.com', emailMasked: 'n***@gmail.com', dob: new Date('1980-03-22'), dobMasked: '**/**/1980', aadhaarMasked: 'XXXX-XXXX-0002', panMasked: 'CDXXX5678G', presentAddress: '78 Koramangala, Bengaluru', presentPincode: '560034', maritalStatus: 'Married', qualification: 'Post Graduate' },
    incomeDetails: { employmentType: 'Self-Employed', annualTurnover: 8000000, businessVintage: 5 },
    businessDetails: { firmName: 'Neha Enterprises', companyType: 'Proprietorship', natureOfBusiness: 'Retail Trading', businessVintage: 5 },
    cibilScore: 718,
    bankAssignments: [{ bankId: hdfc?._id, bankName: 'HDFC Bank', status: 'sanctioned', sanctionAmount: 1800000, sanctionDate: new Date(), statusHistory: [{ status: 'submitted', changedByName: 'Priya Sharma', changedAt: new Date(Date.now() - 10*24*60*60*1000) }, { status: 'sanctioned', changedByName: 'HDFC SM', changedAt: new Date() }] }]
  });

  const app3 = await LoanApplication.create({
    connectorId: conn3._id,
    companyId: company1._id,
    loanType: 'Home Loan',
    loanAmount: 4500000,
    applicantDetails: { name: 'Vikram Singh', mobileRaw: '9834567003', mobileMasked: '98XXXXX003', email: 'v***@gmail.com', emailMasked: 'v***@gmail.com', dob: new Date('1978-11-10'), dobMasked: '**/**/1978', aadhaarMasked: 'XXXX-XXXX-0003', panMasked: 'EFXXX9012H', presentAddress: '234 Bandra West, Mumbai', presentPincode: '400050', maritalStatus: 'Married', qualification: 'Graduate' },
    incomeDetails: { employmentType: 'Salaried', companyName: 'Infosys', netSalary: 120000, totalExperience: 15 },
    propertyDetails: { propertyAddress: '12B Silver Heights, Thane', propertyPincode: '400601', propertyType: 'Flat', propertyAge: 2, builtUpArea: 1200, marketValue: 7500000 },
    cibilScore: 780,
    bankAssignments: [{ bankId: hdfc?._id, bankName: 'HDFC Bank', status: 'disbursement', disbursementAmount: 4200000, disbursementDate: new Date(), statusHistory: [{ status: 'submitted', changedByName: 'Mohammed Ali', changedAt: new Date(Date.now() - 20*24*60*60*1000) }, { status: 'disbursement', changedByName: 'HDFC SM', changedAt: new Date() }] }]
  });

  await LoanApplication.create({
    connectorId: conn1._id,
    companyId: company1._id,
    loanType: 'Car Loan',
    loanAmount: 800000,
    applicantDetails: { name: 'Deepa Rao', mobileRaw: '9845678004', mobileMasked: '98XXXXX004', email: 'd***@gmail.com', emailMasked: 'd***@gmail.com', dob: new Date('1990-07-25'), dobMasked: '**/**/1990', aadhaarMasked: 'XXXX-XXXX-0004', panMasked: 'GHXXX3456I', presentAddress: '56 JP Nagar, Bengaluru', presentPincode: '560078', maritalStatus: 'Single' },
    incomeDetails: { employmentType: 'Salaried', companyName: 'Wipro Technologies', netSalary: 75000, designation: 'Tech Lead' },
    vehicleDetails: { make: 'Maruti Suzuki', model: 'Swift Dzire', variant: 'ZXI+', year: 2024, isNew: true, exShowroomPrice: 950000, onRoadPrice: 1100000, downPayment: 300000 },
    cibilScore: 755,
    bankAssignments: [{ bankId: hdfc?._id, bankName: 'HDFC Bank', status: 'submitted', statusHistory: [{ status: 'submitted', changedByName: 'Rajesh Kumar', changedAt: new Date() }] }]
  });

  await LoanApplication.create({
    connectorId: conn2._id,
    companyId: company2._id,
    loanType: 'Education Loan',
    loanAmount: 1200000,
    applicantDetails: { name: 'Arjun Menon', mobileRaw: '9856789005', mobileMasked: '98XXXXX005', email: 'a***@gmail.com', emailMasked: 'a***@gmail.com', dob: new Date('2000-02-14'), dobMasked: '**/**/2000', aadhaarMasked: 'XXXX-XXXX-0005', panMasked: 'IJXXX7890J', presentAddress: '89 Thrissur Road, Ernakulam', presentPincode: '682001' },
    incomeDetails: { employmentType: 'Salaried', companyName: 'Parent: Kerala State Electricity Board', netSalary: 45000 },
    cibilScore: 690,
    bankAssignments: [{ bankId: hdfc?._id, bankName: 'HDFC Bank', status: 'rejected', rejectionReason: 'Insufficient income for loan amount', statusHistory: [{ status: 'submitted', changedByName: 'Priya Sharma', changedAt: new Date(Date.now() - 5*24*60*60*1000) }, { status: 'rejected', changedByName: 'HDFC SM', changedAt: new Date() }] }]
  });

  console.log('✅ 5 sample loan applications created');

  console.log('\n🎉 SEEDING COMPLETE!\n');
  console.log('================== LOGIN CREDENTIALS ==================');
  console.log('ADMIN     : admin@bankzone.com      / Admin@123');
  console.log('COMPANY 1 : company1@bankzone.com   / Company@123');
  console.log('COMPANY 2 : company2@bankzone.com   / Company@123');
  console.log('BANK      : bank1@bankzone.com      / Bank@123');
  console.log('SM        : sm1@bankzone.com        / SM@123');
  console.log('CONNECTOR1: connector1@bankzone.com / Connector@123');
  console.log('CONNECTOR2: connector2@bankzone.com / Connector@123');
  console.log('CONNECTOR3: connector3@bankzone.com / Connector@123');
  console.log('========================================================\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error('Seed error:', err); process.exit(1); });
