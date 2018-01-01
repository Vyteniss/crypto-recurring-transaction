const transactionScheduler = require("./core/transactionScheduler.js");
const notificationMediator = require("./core/notificationMediator");

const logger = require("./utils/logger");
const Channels = require("./enums/Channels");

logger.info("crypto-recurring-transaction is starting");
console.log(Channels.BUYMARKET);

//subscribe to the events.
//Setup event listeners for node-schedule
//In there publish the specific events

//setup subscriptions
(function() {
  logger.info("Subscriptions are being setup");
  notificationMediator.subscribe(Channels.BUYMARKET, logger, logger.warn);
})();

transactionScheduler.doScheduleAllTransactions();
