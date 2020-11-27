import redis from 'redis';

import configs from './configs';

const client = redis.createClient({
  host: configs.redisHost,
  port: configs.redisPort
});

client.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});

client.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error(`Redis has stopped ${err}`);
});

export default client;
