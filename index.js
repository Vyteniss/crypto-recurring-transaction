const transactionScheduler = require("./core/transactionScheduler.js");
const logger = require("./utils/logger");

logger.info("crypto-recurring-transaction is starting");

transactionScheduler.doScheduleAllTransactions();
