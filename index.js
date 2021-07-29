const express = require("express");
const logger = require("./config/logger");
const { port, env } = require("./config/constants");

const server = express();
const cron = require("node-schedule");
const { queue } = require("./utils/Queue");

cron.scheduleJob("0 */4 * * *", (time) => {
  console.log("hello cron 4 h");
  queue.addToQueue("runner");
});

server.listen(port, () =>
  logger.info(`App listening on ${port} -- ${env} environment ! 🔥 `)
);
