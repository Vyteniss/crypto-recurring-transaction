# crypto-recurring-transaction [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This tool allows traders to create and execute recurring transactions on the exchanges which does not support it in their native interfaces (Kraken and Bitstamp are currently supported). The tool allows the users to execute Dollar cost average strategies.

## USE AT OWN RISK

Not my fault if you lose everything.

I suggest you investigate the code before using it. Create sub-accounts on the exchanges with restricted permissions whenever possible.

## Getting Started

* Clone the repo
* Install dependencies
  * `npm install`
* Copy sample-config.json to config.json and add configuration of the exchanges.
* Copy sample-transactions.json to transactions.json and add configuration of the transactions.
* run app.js with node
  * `node app.js`

### Running in the background

In order for transactions to be executed crypto-recurring-transaction needs to be running all the time. Consider running it with pm2 to put it to background:

`pm2 start app.js --name crt -- --ui`

Then to see the logs:

`pm2 info crt`

### Exchange configuration

Keys and secrets need to be added to config.json

### Transaction configuration

Open transactions.json and add a new object containing your transaction configuration with same fields as this transaction example:

* `"exchange": "bitstamp"` One of the supported exchanges (Currently "bitstamp" or "kraken")
* `"currencyPair": "etheur"` Currency pair in which you want your recurring transaction to be executed. Please refer to [Bitstamp](https://www.bitstamp.net/api/) and [Kraken](https://api.kraken.com/0/public/AssetPairs) documentation for the lists of supported currency pairs
* `"recurrence": "* * */10 * * *"` Cron expression instructing how often transaction should be executed. Consider using crontab expression generator to generate this expression.
* `"amount": 5` Amount of the cryptocurrency to be bought with this transaction.
* `"action": "buyMarket"` Available Options:
  * `buyMarket` - Will buy as much currency as specified in the `amount` property at the market price
  * `buyMarketWithAmountToSpend` - Treats `amount` property as the value that should be spent to buy as much of the currency as possible at the current market price. E.g., combination of properties `"currencyPair": "etheur"` and `"amount": 5` together with `"action": "buyMarketWithAmountToSpend"` means that 5 EUR will be spent to buy as much of Ethereum as possible at the market price at the time of transaction execution. WARNING! In times of high volatility, this might mean that you will spend much more or much less than initially anticipated.

### Prerequisites

Tested with node v8.4.0, should be fine with any of the newer version as well.

### TODOS and Limitations

* Only buy market orders supported. Sell orders to be implemented.
* Kraken API and the service is way better after the [update](https://status.kraken.com/incidents/nswthr1lyx72), should be safe to use.

## Acknowledgments

* [askmike](https://github.com/askmike/) and the perfect job on the bitstamp API wrapper.
