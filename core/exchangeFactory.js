const exchangeDir = "./exchanges/";
const exchangeConfigFile = "./config.json";
const fs = require("fs");
const notificationMediator = require("./notificationMediator");
const logger = require("../utils/logger");
const Constants = require("../constants/Constants");

const ExchangeFactory = function() {
  const exchanges = this;
  const exchangesList = [];

  if (!fs.existsSync(exchangeConfigFile)) {
    logger.error(Constants.EXCHANGE_CFG_NOT_FOUND);
    process.exit();
  }

  fs.readdirSync(exchangeDir).forEach(file => {
    exchangesList.push({
      name: file.slice(0, -3),
      sourceFile: file
    });
  });

  exchangesList.forEach(exchange => {
    if (!exchanges[exchange.name]) {
      let exchangeReference = require("." + exchangeDir + exchange.sourceFile);
      exchanges[exchange.name] = exchangeReference;
    }
  });

  logger.info(notificationMediator);
};

module.exports = new ExchangeFactory();
