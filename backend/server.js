// -----------------------------------------------------------------------------
// 1) Configuration d'environnement (doit être chargée AVANT le reste)
// -----------------------------------------------------------------------------
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import http from "node:http";
import morgan from "morgan";
import logger from "./logger.js";
import appli from "./app.js";




appli.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
};

const port = normalizePort(process.env.PORT || "3000");
appli.set("port", port);

const server = http.createServer(appli);

const errorHandler = (error) => {
  if (error.syscall !== "listen") throw error;

  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  let message = "";

  switch (error.code) {
    case "EACCES":
      message = `${bind} requires elevated privileges.`;
      break;
    case "EADDRINUSE":
      message = `${bind} is already in use.`;
      break;
    default:
      throw error;
  }

  logger.error(`?? Server error: ${message}`);
  process.exit(1);
};

server.on("error", errorHandler);

server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  logger.info(`?? Server listening on ${bind}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("?? Unhandled Rejection", {
    promise,
    reason: reason instanceof Error ? reason.message : reason,
  });
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  logger.error(`?? Uncaught Exception: ${err.message}`, { stack: err.stack });
  server.close(() => {
    process.exit(1);
  });
});

server.listen(port);
