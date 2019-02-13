const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  customer: {type: String}
});

let Client = mongoose.model('Client', clientSchema);

module.exports = Client;
