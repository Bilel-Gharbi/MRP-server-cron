const redis = require("redis");
const { promisify } = require("util");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PSWD,
});
redisClient.on("error", (err) => console.log("Error", err));
redisClient.on("connect", (err) => {
  console.log("connected");
});
redisClient.on("ready", (err) => {
  console.log("ready");
});

redisClient.setAsync = promisify(redisClient.hmset).bind(redisClient);
redisClient.getAsync = promisify(redisClient.hgetall).bind(redisClient);
redisClient.pushAsync = promisify(redisClient.rpush).bind(redisClient);
redisClient.popAsync = promisify(redisClient.lpop).bind(redisClient);
redisClient.rangeAsync = promisify(redisClient.lrange).bind(redisClient);
redisClient.existsAsync = promisify(redisClient.exists).bind(redisClient);
redisClient.delAsync = promisify(redisClient.del).bind(redisClient);

module.exports = {
  redisClient,
};
