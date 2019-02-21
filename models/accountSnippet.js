db.getCollection('transactions').findOneAndUpdate(
  {customer: 'samson'},
  {$push: { 'account': 'checking', 'action': 'deposit', 'amount': 100 } });

var test0 = [ {'account': 'checking'}, {'action': 'deposit'}, {'amount': 200} ];
var test1 = [ {'account': 'checking'}, {'action': 'deposit'}, {'amount': 300} ];
var test2 =  {'account': 'checking', 'action': 'deposit', 'amount': 400}
var test3 =  {'account': 'checking', 'action': 'deposit', 'amount': 500}
var test4 = {'account': 'checking', 'action': 'deposit', 'amount': 600}

db.getCollection('transactions').findOneAndUpdate(
  {customer: 'samson'},
  {$push: { transactions: test }});

db.getCollection('transactions').findOneAndUpdate(
  {customer: 'samson'},
  {$push: { transaction: test }}
  );

  // pushes named array into customer document but does create sub-doc with _id
  db.getCollection('transactions').findOneAndUpdate(
    {customer: 'samson'},
    {$push: { transaction: test3 }}
    )