const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  account: {type: String}
});

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;
