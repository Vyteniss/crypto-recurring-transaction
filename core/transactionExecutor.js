const exchangeFactory = require("./exchangeFactory");
const logger = require("../utils/logger");
const notificationMediator = require("./notificationMediator");
const Channels = require("../enums/Channels");

class TransactionExecutor {
  static doExecuteTransactions(transactions) {
    transactions.forEach(transaction => {
      TransactionExecutor.doExecuteTransaction(transaction);
    });
  }

  static doExecuteTransaction(transaction) {
    notificationMediator.publish(Channels.BUYMARKET, transaction);
    exchangeFactory[transaction.exchange][transaction.action](transaction);
  }
}

module.exports = TransactionExecutor;
