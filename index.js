const express = require("express");
const logger = require("./config/logger");
const { port, env, apiUsersUrl } = require("./config/constants");
const axios = require("axios");
const { cron } = require("./cron");

const server = express();
const schedule = require("node-schedule");

schedule.scheduleJob("1 * * *", function (fire) {
  console.log(fire);
  console.log("The answer to life, the universe, and everything!");
});

const getAllUsers = async () => {
  const { data: usersList } = await axios.get(apiUsersUrl);
  console.log(usersList);
};

console.log(apiUsersUrl);

getAllUsers();
server.listen(port, () =>
  logger.info(`App listening on ${port} -- ${env} environment ! 🔥 `)
);

// ping bscscan

// get response

// loop throw user table
