const logger = require("../utils/logger");
const Constants = require("../constants/Constants");

class notificationMediator {
  constructor() {
    this.channels = [];
  }

  subscribe(channel, context, func) {
    if (!this.channels[channel]) {
      this.channels[channel] = [];
    }
    this.channels[channel].push({
      context: context,
      func: func
    });
  }

  publish(channel) {
    logger.silly(Constants.MESSAGE_PUBL + channel);
    if (!this.channels[channel]) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    for (let i = 0; i < this.channels[channel].length; i++) {
      const sub = this.channels[channel][i];
      sub.func.apply(sub.context, args);
    }
  }
}

module.exports = new notificationMediator();
