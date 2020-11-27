import express from 'express';
// import TelegramBot from 'node-telegram-bot-api';

import configs from './configs';

const app = express();

require('./redis');
require('./bot');
require('./jobs');

app.get('/', (req, res, next) =>
  res.json({
    name: 'Funtap Publisher BOT',
    version: configs.version
  })
);

app.listen(configs.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${configs.port}
    Env: ${app.get('env')}
  `);
});

export default app;
