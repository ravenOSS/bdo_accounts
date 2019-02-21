const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  [{
    account: {
      type: String,
      enum: ['checking', 'savings', 'investments'],
      required: true
    },
    action: {
      type: String,
      enum: ['deposit', 'billpay', 'transfer'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }]
);

const bankingSchema = new mongoose.Schema({
  customer: {type: String},
  transaction: [transactionSchema]
});

let Banking = mongoose.model('Banking', bankingSchema);

module.exports = Banking;
