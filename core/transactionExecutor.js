const exchangeFactory = require("./exchangeFactory");
const notificationMediator = require("./notificationMediator");
const Constants = require("../constants/Constants");

class TransactionExecutor {
  static doExecuteTransactions(transactions) {
    transactions.forEach(transaction => {
      TransactionExecutor.doExecuteTransaction(transaction);
    });
  }

  static doExecuteTransaction(transaction) {
    notificationMediator.publish(Constants.BUY_MARKET, transaction);
    exchangeFactory[transaction.exchange][transaction.action](transaction);
  }
}

module.exports = TransactionExecutor;
