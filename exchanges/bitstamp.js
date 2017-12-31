const fs = require("fs");
const Bitstamp = require("bitstamp");
const logger = require("../utils/logger");

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

  buyMarket(transaction) {
    this.bitstampClient.buyMarket(
      transaction.currencyPair,
      transaction.amount,
      logger.info
    );
  }
}

module.exports = new BitstampExchange();
