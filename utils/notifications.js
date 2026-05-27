const Notification = require('../models/Notification');

const notify = async ({ userId, userRole, title, message, type='general', refId=null }) => {
  try { await Notification.create({ userId, userRole, title, message, type, refId }); }
  catch (err) { console.error('Notify error:', err.message); }
};

const notifyMany = async (users, { title, message, type='general', refId=null }) => {
  try {
    await Notification.insertMany(users.map(u => ({ userId: u.userId, userRole: u.userRole, title, message, type, refId, isRead: false })));
  } catch (err) { console.error('NotifyMany error:', err.message); }
};

const notifyLeadSubmitted    = async ({ adminId, bankerIds, leadId, loanType }) => notifyMany([{ userId: adminId, userRole: 'admin' }, ...(bankerIds||[]).map(id=>({ userId: id, userRole: 'banker' }))], { title: 'New Lead Submitted', message: `A new ${loanType} lead assigned to you.`, type: 'lead', refId: leadId });
const notifyBankerAccepted   = async ({ connectorId, leadId, bankerName }) => notify({ userId: connectorId, userRole: 'connector', title: 'Banker Accepted Lead', message: `${bankerName} accepted your lead. Please approve data unmasking.`, type: 'lead', refId: leadId });
const notifyUnlockApproved   = async ({ bankerId, leadId, connectorName }) => notify({ userId: bankerId, userRole: 'banker', title: 'Data Unmasked', message: `${connectorName} approved full data access.`, type: 'unlock', refId: leadId });
const notifyQueryRaised      = async ({ connectorId, adminId, leadId, bankerName }) => notifyMany([{ userId: connectorId, userRole: 'connector' }, { userId: adminId, userRole: 'admin' }], { title: 'Query Raised', message: `${bankerName} raised a query on a lead.`, type: 'query', refId: leadId });
const notifyQueryReplied     = async ({ bankerId, leadId, replierName }) => notify({ userId: bankerId, userRole: 'banker', title: 'Query Reply', message: `${replierName} replied to your query.`, type: 'query', refId: leadId });
const notifySanctioned       = async ({ connectorId, adminId, leadId, loanType }) => notifyMany([{ userId: connectorId, userRole: 'connector' }, { userId: adminId, userRole: 'admin' }], { title: 'Loan Sanctioned', message: `A ${loanType} loan sanctioned.`, type: 'sanction', refId: leadId });
const notifyDisbursed        = async ({ connectorId, adminId, leadId, amount }) => notifyMany([{ userId: connectorId, userRole: 'connector' }, { userId: adminId, userRole: 'admin' }], { title: 'Loan Disbursed', message: `₹${Number(amount).toLocaleString('en-IN')} disbursed.`, type: 'disbursement', refId: leadId });
const notifyTATBreach        = async ({ adminId, leadId, stage }) => notify({ userId: adminId, userRole: 'admin', title: '⚠️ TAT Breach', message: `Lead breached SLA at stage: ${stage}.`, type: 'tat', refId: leadId });

module.exports = { notify, notifyMany, notifyLeadSubmitted, notifyBankerAccepted, notifyUnlockApproved, notifyQueryRaised, notifyQueryReplied, notifySanctioned, notifyDisbursed, notifyTATBreach };
