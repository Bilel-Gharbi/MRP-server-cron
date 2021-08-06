const express = require("express");
const logger = require("./config/logger");
const { port, env } = require("./config/constants");

const server = express();
const cron = require("node-schedule");
const { queue } = require("./utils/Queue");

cron.scheduleJob("0 */4 * * *", (time) => {
  // cron.scheduleJob("*/1 * * * *", (time) => {
  console.log("cron 4 h");
  // console.log("cron 1 min");
  queue.addToQueue("runner");
});

server.listen(port, () =>
  logger.info(`App listening on ${port} -- ${env} environment ! 🔥 `)
);
