import TelegramBot from 'node-telegram-bot-api';

import redis from '../redis';

import configs from '../configs';
import { SUBSCRIBE_REMIND_LIST } from '../constants';

// Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
const telegram = new TelegramBot(configs.telegramBotToken, {
  polling: true
});

telegram.onText(/\/subscribe_remind/, (message) => {
  redis.hset(SUBSCRIBE_REMIND_LIST, message.chat.id, 1, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    telegram.sendMessage(message.chat.id, 'Subscribe remind successfully!');
  });
});

telegram.onText(/\/un_subscribe_remind/, (message) => {
  redis.hdel(SUBSCRIBE_REMIND_LIST, message.chat.id, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    telegram.sendMessage(message.chat.id, 'Reminder unsubscribe successfully!');
  });
});

// telegram.onText(/\/manager_api/, (message) => {
//   telegram.sendMessage(message.chat.id, 'Choose', {
//     reply_markup: {
//       keyboard: [['Add api', 'Remove api']]
//     }
//   });
// });

// // telegram.answerCallbackQuery(a, () => {})

// telegram.on('callback_query', (callbackQuery) => {
//   const msg = callbackQuery.message;
//   telegram
//     .answerCallbackQuery(callbackQuery.id)
//     .then(() => telegram.sendMessage(msg.chat.id, 'You clicked!'));
// });

telegram.onText(/\/manager_api/, (msg, match) => {
  telegram.sendMessage(msg.chat.id, 'Choose', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Add api',
            callback_data: 'add_api'
          }
        ],
        [
          {
            text: 'Remove api',
            callback_data: 'remove_api'
          }
        ]
      ]
    }
  });
});

telegram.on('callback_query', (callbackQuery) => {
  // console.log('callbackQuery', callbackQuery);
  const msg = callbackQuery.message;
  if (callbackQuery.data === 'add_api') {
    telegram.answerCallbackQuery(callbackQuery.id).then(() => {
      telegram
        .sendMessage(msg.chat.id, 'Please enter api url', {
          reply_markup: JSON.stringify({
            // keyboard: [['Ti amo alla follia'], ['Mi spiace ma non fai per me']],
            // one_time_keyboard: true,
            force_reply: true
          })
        })
        .then((reply, rep) => {
          // states[msg.chat.id] = 2;
          // console.log(`Asked a question to ${msg.chat.id}`);
          console.log('reply', reply);
          console.log('rep', rep);
        });
      // telegram.sendMessage(msg.chat.id, 'You clicked!');
    });
  } else if (callbackQuery.data === 'remove_api') {
  }
});

export default telegram;
