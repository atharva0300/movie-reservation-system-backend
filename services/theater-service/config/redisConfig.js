const redis = require('redis');

let redisClient;

const connectToRedis = async () => {
    redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_DOCKER_HOST,
            port: process.env.REDIS_DOCKER_PORT
        }
    });

    redisClient.on('error', (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
    return redisClient;
};

connectToRedis().catch(error => console.error(`Failed to connect to Redis: ${error}`));

module.exports = redisClient;
