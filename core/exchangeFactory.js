const exchangeDir = "./exchanges/";
const exchangeConfigFile = "./config.json";
const fs = require("fs");
const logger = require("../utils/logger");
const Constants = require("../constants/Constants");

const ExchangeFactory = function() {
  const exchanges = this;
  const exchangesList = [];

  //Check if the config file exists
  if (!fs.existsSync(exchangeConfigFile)) {
    logger.error(Constants.EXCHANGE_CFG_NOT_FOUND);
    process.exit();
  }

  // Get list of exchanges from the exchanges directory
  fs.readdirSync(exchangeDir).forEach(file => {
    exchangesList.push({
      name: file.slice(0, -3),
      sourceFile: file
    });
  });

  // Construct a list of references to the exchange objects
  exchangesList.forEach(exchange => {
    if (!exchanges[exchange.name]) {
      let exchangeReference = require("." + exchangeDir + exchange.sourceFile);
      exchanges[exchange.name] = exchangeReference;
    }
  });
};

module.exports = new ExchangeFactory();
