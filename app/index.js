import express from 'express';
// import TelegramBot from 'node-telegram-bot-api';

import Constants from './config/constants';
import telegram from './bot';

const app = express();

// Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
// const telegram = new TelegramBot(Constants.telegramBotToken, {
//   polling: true
// });

// telegram.on('text', (message) => {
//   if (message.text.toLowerCase().indexOf('/remind') === 0) {
//     // clear.getEventById('oo4QIuKQQTYA', (codedayEvent) => {
//     //   var endsAt = moment(codedayEvent.ends_at * 1000);
//     //   telegram.sendMessage(
//     //     message.chat.id,
//     //     'CodeDay ends ' + endsAt.fromNow() + '!'
//     //   );
//     // });
//   }
//   telegram.sendMessage(message.chat.id, 'Hello world');
// });

app.get('/', (req, res, next) =>
  res.json({
    name: 'Funtap Publisher BOT',
    version: Constants.version
  })
);

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
