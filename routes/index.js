const express = require('express');
const router = express.Router();
const Client = require('../models/client');

/* GET newAccount page */
router.get('/', (req, res, next) => {
  res.render('newClient', {
    title: 'Client Test'
  });
});

router.get('/confirm', (req, res) => {
  res.render('confirm');
});

router.post('/clientAccount', function (req, res, next) {
  let customer = req.body.customer;
  Client.findOne({ customer: customer }, function (err, customer) {
    if (err) { return next(err); }
    if (customer) {
      console.log(`Client ${customer} already registered`);
      return res.status(400).send('Member already registered');
    }
    var newClient = new Client({
      customer: req.body.customer
    });
    newClient.save();
  });
  res.redirect('/confirm');
});

module.exports = router;
