const fs = require("fs");
const Bitstamp = require("bitstamp");
const logger = require("../utils/logger");
const CalcUtils = require("../utils/calc");

class BitstampExchange {
  constructor() {
    const config = this.readConfig();
    this.bitstampClient = new Bitstamp(
      config.key,
      config.secret,
      config.clientId
    );
  }

  readConfig() {
    const rawData = fs.readFileSync("./config.json");
    const parsedJSON = JSON.parse(rawData);

    return {
      key: parsedJSON.exchanges.bitstamp.key,
      secret: parsedJSON.exchanges.bitstamp.secret,
      clientId: parsedJSON.exchanges.bitstamp.clientId
    };
  }

  buyMarket(currencyPair, amount) {
    this.bitstampClient.buyMarket(currencyPair, amount, (err, resp) => {
      logger.info({
        error: err,
        resp: resp
      });
    });
  }

  buyMarketWithAmountToSpend(currencyPair, amountToSpend) {
    this.bitstampClient.ticker(currencyPair, (err, ticker) => {
      if (err) {
        logger.error(err);
      } else {
        const amountToBuy = CalcUtils.CalcAmountToBuy(
          amountToSpend,
          ticker.last
        );
        this.buyMarket(currencyPair, amountToBuy);
      }
    });
  }
}

module.exports = new BitstampExchange();
