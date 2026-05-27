const mongoose = require('mongoose');
const bankUserSchema = new mongoose.Schema({ bankerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, bankId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bank' } }, { timestamps: true });
module.exports = mongoose.model('BankUser', bankUserSchema);
