const exchangeFactory = require("./exchangeFactory");

class TransactionExecutor {
  static doExecuteTransactions(transactions) {
    transactions.forEach(transaction => {
      TransactionExecutor.doExecuteTransaction(transaction);
    });
  }

  static doExecuteTransaction(transaction) {
    console.log(
      new Date(),
      "Transaction executed on: " + transaction.exchange,
      "On currency pair:" + transaction.currencyPair,
      "Action: " + transaction.action,
      "Amount: " + transaction.amount
    );
    exchangeFactory[transaction.exchange][transaction.action](transaction);
  }
}

module.exports = TransactionExecutor;
