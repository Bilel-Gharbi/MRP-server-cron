const { redisClient } = require("../config/redis");

class Queue {
  constructor() {
    // this.invest = require("./invest");
    // this.createAccount = require("./createAccount");
    this.runner = require("../cron").runner;
    // this.lunchTasks();
  }

  async addToQueue(data = "") {
    const length = await redisClient.pushAsync(["queue", data]);
    console.log(length);
    console.log(data, "Added !!");
    if (length === 1) {
      this.lunchTasks().catch((err) => {
        console.log("err", err);
      });
    }
  }

  getFirstQueueElement() {
    return redisClient.rangeAsync("queue", 0, 0);
  }

  removeFromQueue() {
    return redisClient.popAsync("queue");
  }

  queueLength() {
    return redisClient.rangeAsync("queue", 0, -1);
  }

  closeQueue() {
    return redisClient.delAsync("queue");
  }

  exists() {
    return redisClient.existsAsync("queue");
  }

  async lunchTasks() {
    try {
      const [length, exists] = await Promise.all([
        this.queueLength(),
        this.exists(),
      ]);
      console.log(exists);
      console.log(length);
      if (!exists || !length) {
        return this.closeQueue();
      }
      const task = await this.getFirstQueueElement();
      console.log(task, "Started !!");
      //   const [operation, params] = task.split("/^/");
      //   await this.handleTask(
      //     operation,
      //     operation === "createAccount" ? params : JSON.parse(params)
      //   );
      await this.handleTask(task);
      await this.removeFromQueue();
      console.log(task, "Done !!");
    } catch (err) {
      console.log({ err });
    }
    return this.lunchTasks();
  }

  async handleTask(operation, count = 0) {
    try {
      if (count >= 5) throw { msg: "countDown" };
      await this[operation]();
    } catch (err) {
      console.log(
        err.response && err.response.data
          ? err.response.data
          : err.response
          ? err.response
          : err
      );

      if (count < 5) return this.handleTask(operation, count + 1);
      throw err;
    }
  }
}

module.exports = {
  redisClient,
  queue: new Queue(),
};
