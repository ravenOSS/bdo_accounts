const express = require('express');
const router = express.Router();
const Banking = require('../models/account');

/* GET newAccount landing page. Registers user lastname */
router.get('/', (req, res, next) => {
  res.render('newClient', {
    title: 'Customer Registration'
  });
});

/* GET basic banking page (manual entry) */
router.get('/bankingtest', (req, res) => {
  res.render('bankingTest', { title: 'Test Banking' });
});

/* GET multiple transaction selection */
router.get('/banking', (req, res) => {
  res.render('banking', { title: 'Banking' });
});

/* GET registration & transaction confirmation */
router.get('/confirm', (req, res) => {
  res.render('confirm');
});

router.post('/bankingtest', function (req, res, next) {
  let customer = req.body.customer;
  let account = req.body.account;
  let action = req.body.action;
  let amount = (req.body.amount);
  
  Banking.findOneAndUpdate({ customer: req.body.customer },
    { '$push':
      { 'transaction': {
        'account': req.body.account,
        'action': req.body.action,
        'amount': req.body.amount
      }
      }
    },
    function (err) {
      console.log(err);
    });
  res.redirect('/confirm');
});
//   Transaction.findOneAndUpdate({ customer: customer },
//     {$push: {transaction: (accountentry)}});
// });

// This is the route for the initial customer registration
router.post('/clientAccount', function (req, res, next) {
  let customer = req.body.customer;
  Banking.findOne({ customer: customer }, function (err, customer) {
    if (err) { return next(err); }
    if (customer) {
      console.log(`Client ${customer} already registered`);
      res.redirect(400, '/', { title: 'Please try again' });
    }
    let newClient = new Banking({
      customer: req.body.customer
    });
    newClient.save();
  });
  res.redirect('/confirm');
});

router.post('/banking', (req, res, next) => {
  let customer = req.body.customer;
  Transaction.findOne({ customer: customer }, (err, account) => {
    if (err) { return next(err); }
    if (!account) {
      console.log(`Account user ${customer} not found`); // does not work. account SHOULD exist
    }
    let newTransaction = new Transaction({
      customer: req.body.customer,
      account: req.body.account,
      transaction: req.body.transaction,
      amount: req.body.amount
    });
    newTransaction.save();
    console.log(`Saved: ${Transaction}`);
  });
  res.redirect('/banking');
});

module.exports = router;
