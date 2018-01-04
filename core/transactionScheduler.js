// Schedules task to run recurringly
const schedule = require("node-schedule");
const TransactionExecutor = require("./transactionExecutor");
const transactionFactory = require("./transactionFactory");
const exchangeFactory = require("./exchangeFactory");
const logger = require("../utils/logger");
const Constants = require("../constants/Constants");

class TransactionScheduler {
  constructor(transactions) {
    this.transactions = transactions;
    this.time = new Date();
    this.scheduledTransactionJobs = [];
  }

  setTransactions(transactions) {
    this.transactions = transactions;
  }

  getTransactions() {
    return this.transactions;
  }

  doScheduleAllTransactions() {
    this.doScheduleTransactions(this.transactions);
  }

  doScheduleTransactions(transactions) {
    const that = this;
    transactions.forEach(transaction => {
      that.doScheduleTransaction(transaction);
    });
  }

  doScheduleTransaction(transaction) {
    if (!exchangeFactory[transaction.exchange]) {
      logger.error({
        exchange: transaction.exchange,
        message: Constants.NO_CFG_FOR_EXCHANGE
      });
      process.exit();
    }

    const job = schedule.scheduleJob(transaction.recurrence, () => {
      TransactionExecutor.doExecuteTransaction(transaction);
    });

    this.scheduledTransactionJobs.push(job);
    return job;
  }

  static listScheduledTransactions() {
    return schedule.scheduledJobs;
  }

  cancelAllTransactions() {
    this.scheduledTransactionJobs.forEach(job => {
      job.cancel();
    });
  }

  static getNextInvocation(scheduledTransactionJob) {
    return scheduledTransactionJob.getNextInvocation();
  }
}

module.exports = new TransactionScheduler(transactionFactory.transactions);
