const fs = require("fs");
const Transaction = require("./transaction");

const TransactionFactory = function() {
  this.transactions = [];
  this.time = new Date();
  this.reloadTransactions();
};

TransactionFactory.prototype.reloadTransactions = function() {
  const rawData = this.readTransactionsJSON();
  this.transactions = this.constructTransactions(rawData);
};

TransactionFactory.prototype.readTransactionsJSON = () => {
  const rawData = fs.readFileSync("./transactions.json");
  const parsedJSON = JSON.parse(rawData);

  if (
    !parsedJSON ||
    !parsedJSON.transactions ||
    parsedJSON.transactions.length == 0
  ) {
    console.log("No transactions defined in transactions.json. Exiting.");
    process.exit();
  }

  return parsedJSON;
};

TransactionFactory.prototype.constructTransactions = rawData => {
  const transactions = [];
  rawData.transactions.forEach(transaction => {
    transactions.push(
      new Transaction(
        transaction.exchange,
        transaction.currencyPair,
        transaction.recurrence,
        transaction.amount,
        transaction.action
      )
    );
  });

  return transactions;
};

module.exports = new TransactionFactory();
