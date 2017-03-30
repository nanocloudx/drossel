const Redis = require('ioredis');
module.exports = new Redis(process.env.SESSION_REDIS_URL);
