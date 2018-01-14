const fs = require("fs");
const Transaction = require("./transaction");
const logger = require("../utils/logger");
const transactionConfigFile = "./transactions.json";
const Constants = require("../constants/Constants");

const TransactionFactory = function() {
  this.transactions = [];
  this.time = new Date();
  this.reloadTransactions();
};

TransactionFactory.prototype.reloadTransactions = function() {
  if (!fs.existsSync(transactionConfigFile)) {
    logger.error(Constants.TRANS_CFG_NOT_FOUND);
    process.exit(1);
  }

  const rawData = this.readTransactionsJSON();
  this.transactions = this.constructTransactions(rawData);
};

TransactionFactory.prototype.readTransactionsJSON = () => {
  const rawData = fs.readFileSync(transactionConfigFile);
  const parsedJSON = JSON.parse(rawData);

  if (
    !parsedJSON ||
    !parsedJSON.transactions ||
    parsedJSON.transactions.length == 0
  ) {
    logger.error(Constants.NO_TRANS_DEFINED);
    process.exit(1);
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
