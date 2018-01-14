const fs = require("fs");
const KrakenClient = require("kraken-api");
const logger = require("../utils/logger");
const CalcUtils = require("../utils/calc");

class KrakenExchange {
  constructor() {
    const config = this.readConfig();
    this.krakenClient = new KrakenClient(config.key, config.secret, {
      timeout: 100000
    });
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
          logger.error(error);
        } else {
          logger.info(data.result);
        }
      }
    );
  }

  buyMarketWithAmountToSpend(currencyPair, amountToSpend) {
    const pairAltName = this.getAltName(currencyPair);

    this.krakenClient.api("Ticker", { pair: pairAltName }, (err, data) => {
      if (err) {
        logger.error(err);
        logger.error(data);
      } else {
        const lastPrice = data.result[pairAltName].c[0];
        const amountToBuy = CalcUtils.CalcAmountToBuy(amountToSpend, lastPrice);
        this.buyMarket(currencyPair, amountToBuy);
      }
    });
  }

  getAltName(currencyPair) {
    //Mappings for the pairs which have different "name" and "altname"
    //this is required to get Ticker information
    const pairNameMappings = {
      USDTUSD: "USDTZUSD",
      ETCETH: "XETCXETH",
      ETCXBT: "XETCXXBT",
      ETCEUR: "XETCZEUR",
      ETCUSD: "XETCZUSD",
      ETHXBT: "XETHXXBT",
      ETHCAD: "XETHZCAD",
      ETHEUR: "XETHZEUR",
      ETHGBP: "XETHZGBP",
      ETHJPY: "XETHZJPY",
      ETHUSD: "XETHZUSD",
      ICNETH: "XICNXETH",
      ICNXBT: "XICNXXBT",
      LTCXBT: "XLTCXXBT",
      LTCEUR: "XLTCZEUR",
      LTCUSD: "XLTCZUSD",
      MLNETH: "XMLNXETH",
      MLNXBT: "XMLNXXBT",
      REPETH: "XREPXETH",
      REPXBT: "XREPXXBT",
      REPEUR: "XREPZEUR",
      XBTCAD: "XXBTZCAD",
      XBTEUR: "XXBTZEUR",
      XBTGBP: "XXBTZGBP",
      XBTJPY: "XXBTZJPY",
      XBTUSD: "XXBTZUSD",
      XDGXBT: "XXDGXXBT",
      XLMXBT: "XXLMXXBT",
      XMRXBT: "XXMRXXBT",
      XMREUR: "XXMRZEUR",
      XMRUSD: "XXMRZUSD",
      XRPXBT: "XXRPXXBT",
      XRPEUR: "XXRPZEUR",
      XRPUSD: "XXRPZUSD",
      ZECXBT: "XZECXXBT",
      ZECEUR: "XZECZEUR",
      ZECUSD: "XZECZUSD"
    };

    if (pairNameMappings[currencyPair]) {
      return pairNameMappings[currencyPair];
    } else {
      return currencyPair;
    }
  }
}

module.exports = new KrakenExchange();
