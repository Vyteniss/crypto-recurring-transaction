const exchangeFactory = require("./exchangeFactory");
const logger = require("../utils/logger");

class TransactionExecutor {
  static doExecuteTransactions(transactions) {
    transactions.forEach(transaction => {
      TransactionExecutor.doExecuteTransaction(transaction);
    });
  }

  static doExecuteTransaction(transaction) {
    logger.info({
      status: "Transaction issued",
      market: transaction.exchange,
      currencyPair: transaction.currencyPair,
      action: transaction.action,
      amount: transaction.amount
    });

    exchangeFactory[transaction.exchange][transaction.action](transaction);
  }
}

module.exports = TransactionExecutor;
