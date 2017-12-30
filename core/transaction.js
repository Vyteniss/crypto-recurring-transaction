class Transaction {
  constructor(exchange, currencyPair, recurrence, amount, action) {
    this.exchange = exchange;
    this.currencyPair = currencyPair;
    this.recurrence = recurrence;
    this.amount = amount;
    this.action = action;
  }
}

module.exports = Transaction;
