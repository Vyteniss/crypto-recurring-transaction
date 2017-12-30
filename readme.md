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
* run index.js with node
  * `node index.js`

### Running in the background

In order for transactions to be executed crypto-recurring-transaction needs to be running all the time. Consider running it with pm2 to put it to background:

`pm2 start index.js --name crt -- --ui`

Then to see the logs:

`pm2 info crt`

### Exchange configuration

Keys and secrets need to be added to config.json

### Transaction configuration

Open transactions.json and add a new object containing your transaction configuration with same fields as this transaction example:

* `"exchange": "bitstamp"` One of the supported exchanges (Currently "bitstamp" or "kraken")
* `"currencyPair": "etheur"` Currency pair in which you want your recurring transaction to be executed. Please refer to [Bitstamp](https://www.bitstamp.net/api/) and [Kraken](https://api.kraken.com/0/public/AssetPairs) documentation for the lists of supported currency pairs
* `"recurrence": "*/1 * * * * *"` Cron expression instructing how often transaction should be executed. Consider using crontab expression generator to generate this expression.
* `"amount": 5` Amount of the cryptocurrency to be bought with this transaction.
* `"action": "buyMarket"` Currently only "buyMarket"

### Prerequisites

Tested with node v8.4.0, should be fine with any of the newer version as well.

### TODOS and Limitations

* Logging currently only to stdout. Logging to files to be implemented.
* Only buy market orders supported. Sell orders to be implemented.
* Only Bitstamp currently supported. Kraken API and the service itself is highly unstable nowadays, better to avoid it for now. More exchanges to be added.

## Acknowledgments

* [askmike](https://github.com/askmike/) and the perfect job on the bitstamp API wrapper.
