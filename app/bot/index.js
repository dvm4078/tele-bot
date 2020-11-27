import TelegramBot from 'node-telegram-bot-api';

import Constants from '../config/constants';

const subscribeRemindList = {};

// Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
const telegram = new TelegramBot(Constants.telegramBotToken, {
  polling: true
});

telegram.on('text', (message) => {
  const beautyMessage = message.text.toLowerCase();
  console.log('beautyMessage', beautyMessage);
  switch (beautyMessage) {
    case '/subscribe_remind':
      subscribeRemindList[message.chat.id] = 1;
      telegram.sendMessage(message.chat.id, 'Subscribe remind successfully!');
      break;
    case '/un-subscribe-remind':
      delete subscribeRemindList[message.chat.id];
      telegram.sendMessage(
        message.chat.id,
        'Reminder unsubscribe successfully!'
      );
      break;

    default:
      break;
  }
  if (message.text.toLowerCase().indexOf('/remind') === 0) {
    subscribeRemindList[message.chat.id] = 1;
    telegram.sendMessage(message.chat.id, 'Subscribe remind successfully!');
    // clear.getEventById('oo4QIuKQQTYA', (codedayEvent) => {
    //   var endsAt = moment(codedayEvent.ends_at * 1000);
    //   telegram.sendMessage(
    //     message.chat.id,
    //     'CodeDay ends ' + endsAt.fromNow() + '!'
    //   );
    // });
  }
  // telegram.sendMessage(message.chat.id, 'Hello world');
});

export default telegram;
