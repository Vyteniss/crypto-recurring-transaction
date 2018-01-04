const transactionScheduler = require("./core/transactionScheduler.js");
const notificationMediator = require("./core/notificationMediator");

const logger = require("./utils/logger");
const Constants = require("./constants/Constants");

logger.info(Constants.STARTING);

//setup subscriptions
(function() {
  logger.info(Constants.SUBSCRIPTIONS_SETUP);
  notificationMediator.subscribe(Constants.BUY_MARKET, logger, logger.info);
  logger.info(Constants.SUBSCRIPTIONS_SETUP_CMP);
})();

transactionScheduler.doScheduleAllTransactions();
