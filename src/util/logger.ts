import pino from "pino";
import fs from "fs";
import path from "path";
import { env } from "@config/config";

const logsDir = path.join("logs");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const transport = pino.transport({
  targets: [
    {
      level: "info",
      target: "pino/file",
      options: { destination: `logs/info.log` },
    },
    {
      level: "error",
      target: "pino/file",
      options: { destination: `logs/error.log` },
    },
    ...(env.NODE_ENV === "development" ? [{ target: "pino-pretty" }] : []),
  ],
});

const logger = pino(
  {
    level: "info",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

export default logger;
