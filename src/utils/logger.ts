import "module-alias/register";
import bunyan from "bunyan";
import bformat from "bunyan-format";
import path from "path";
import fs from "fs";
import { config } from "@core/config";
import Elasticsearch from "bunyan-elasticsearch";
import { createWriteStream } from "fs";

import { bunyanMiddleware } from "./bunyan-middleware";

const formatOut = bformat({
  outputMode: config.logs.format as any,
  color: true,
});

const createLogger = (appName: string) => {
  let esStream: any;
  const logsPath: string = path.resolve(process.cwd(), `./${config.logs.path}`);
  const logsPathApp = `${logsPath}/${appName}`;
  if (!fs.existsSync(logsPathApp)) {
    fs.mkdirSync(logsPathApp, { recursive: true });
  }

  const now = Date.now();

  const logsPathInfo = `${logsPathApp}/${now}.logs.json`;
  const logsPathError = `${logsPathApp}/${now}.errors.json`;

  if (config.env === "uction") {
    esStream = new Elasticsearch({
      indexPattern: "[logstash-]YYYY.MM.DD",
      type: "logs",
      host: `${config.elastic.domain}:${config.elastic.port}`,
    });

    esStream.on("error", function (err: Error) {
      console.log("Elasticsearch Stream Error:", err.stack);
    });
  }

  const logger = bunyan.createLogger({
    name: appName,
    streams: esStream
      ? [{ stream: process.stdout }, { stream: esStream }]
      : [
          {
            level: "debug",
            stream: createWriteStream(logsPathInfo),
          },
          {
            level: "error",
            stream: createWriteStream(logsPathError),
          },
          {
            stream: formatOut,
          },
        ],
    level: config.logs.lvl as any,
  });

  return {
    logger,
    middleware: () =>
      bunyanMiddleware({
        headerName: "X-Request-Id",
        propertyName: "reqId",
        logName: appName,
        logger: logger,
      }),
  };
};

export { createLogger };
