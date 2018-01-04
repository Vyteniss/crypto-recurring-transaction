// https://gist.github.com/a-h/d02bd4ff238e5923fcf5369233e51401
const winston = require("winston");
const MESSAGE = Symbol.for("message");
const jsonFormatter = logEntry => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};

const logger = winston.createLogger({
  level: "silly",
  format: winston.format(jsonFormatter)(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./logs/combined.log"
    })
  ]
});

module.exports = logger;
