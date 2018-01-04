const exchangeDir = "./exchanges/";
const exchangeConfigFile = "./config.json";
const fs = require("fs");
const logger = require("../utils/logger");

const ExchangeFactory = function() {
  const exchanges = this;
  const exchangesList = [];

  if (!fs.existsSync(exchangeConfigFile)) {
    logger.error("Exchange configuration file not found. Exiting");
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
};

module.exports = new ExchangeFactory();
