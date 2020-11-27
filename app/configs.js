import path from 'path';
import dotEnv from 'dotenv';

dotEnv.load({ path: path.resolve(__dirname, '..', '.env') });

// Default configuations applied to all environments
const defaultConfig = {
  version: require('../package.json').version,
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
};

export default defaultConfig;
