import winston from "winston";
import path from "node:path";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join("logs", "app.log"),
      format: winston.format.json(),
    }),
  ],
});

function formatArg(arg) {
  if (typeof arg === "object" && arg !== null) {
    try {
      return JSON.stringify(arg);
    } catch {
      return "[Circular]";
    }
  }
  return String(arg);
}

console.log = (...args) => {
  logger.info(args.map(formatArg).join(" "));
};

console.warn = (...args) => {
  logger.warn(args.map(formatArg).join(" "));
};

console.error = (...args) => {
  logger.error(args.map(formatArg).join(" "));
};

export default logger;
