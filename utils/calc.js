const logger = require("../utils/logger");

class CalcUtils {
  static CalcAmountToBuy(amountToSpent, tickerPrice, decimalNumbers = 8) {
    const decimals = Math.pow(10, decimalNumbers);
    //TODO use base decimal number limits from the Trading Pair dictionaries from the APIs. 8 decimal spaces by default
    const calculatedAmount =
      Math.ceil(amountToSpent / tickerPrice * decimals) / decimals;

    logger.silly("Calculated Amount: " + calculatedAmount);

    return calculatedAmount;
  }
}

module.exports = CalcUtils;
