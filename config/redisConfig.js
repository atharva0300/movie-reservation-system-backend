const redis = require('redis')

let redisClient;

const connectToRedis = async () => {
    redisClient = redis.createClient(6379);
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect()
    return redisClient
}

connectToRedis()

module.exports = redisClient