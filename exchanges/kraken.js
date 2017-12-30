const fs = require("fs");
const KrakenClient = require("kraken-api");

class KrakenExchange {
  constructor() {
    const config = this.readConfig();
    this.krakenClient = new KrakenClient(config.key, config.secret);
  }

  readConfig() {
    const rawData = fs.readFileSync("./config.json");
    const parsedJSON = JSON.parse(rawData);

    return {
      key: parsedJSON.exchanges.kraken.key,
      secret: parsedJSON.exchanges.kraken.secret
    };
  }

  buyMarket(transaction) {
    this.krakenClient.api(
      "AddOrder",
      {
        pair: transaction.currencyPair,
        type: "buy",
        ordertype: "market",
        volume: transaction.amount
      },
      function(error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log(data.result);
        }
      }
    );
  }
}

module.exports = new KrakenExchange();
