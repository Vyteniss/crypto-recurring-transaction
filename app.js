const transactionScheduler = require("./core/transactionScheduler.js");
const notificationMediator = require("./core/notificationMediator");

const logger = require("./utils/logger");
const Channels = require("./enums/Channels");

logger.info("crypto-recurring-transaction is starting");

//setup subscriptions
(function() {
  logger.info("Subscriptions are being setup");
  notificationMediator.subscribe(Channels.BUYMARKET, logger, logger.warn);
})();

transactionScheduler.doScheduleAllTransactions();
