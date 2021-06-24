const schedule = require("node-schedule");

module.exports.cron = () => {
  schedule.scheduleJob("* 2 * * * *", function () {
    console.log("The answer to life, the universe, and everything!");
  });
};
