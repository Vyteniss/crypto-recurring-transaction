const exchangeDir = "./exchanges/";
const fs = require("fs");

const ExchangeFactory = function() {
  const exchanges = this;
  const exchangesList = [];

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
