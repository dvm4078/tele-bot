import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';

import redis from '../redis';

import configs from '../configs';
import { SUBSCRIBE_REMIND_LIST, API_URL_LIST } from '../constants';

const telegram = new TelegramBot(configs.telegramBotToken, {
  polling: true
});

/** Call đến các api đã đăng ký
 * Command "/report
 * */
telegram.onText(/\/report/, (message) => {
  redis.hkeys(API_URL_LIST, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    if (response.length) {
      response.map((api) => {
        fetch(api)
          .then((res) => res.json())
          .then((json) => {
            const replyMessage =
              `******* Response from api ${api} *********** \n` +
              JSON.stringify(json, null, 4) +
              telegram.sendMessage(message.chat.id, replyMessage);
          });
      });
    } else {
      telegram.sendMessage(message.chat.id, 'List api is empty!');
    }
  });
});

/** Đăng ký nhắc nhở.
 * Command "/subscribe_remind"
 * */
telegram.onText(/\/subscribe_remind/, (message) => {
  redis.hset(SUBSCRIBE_REMIND_LIST, message.chat.id, 1, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    telegram.sendMessage(message.chat.id, 'Subscribe remind successfully!');
  });
});

/** Hủy đăng ký nhắc nhở.
 * Command "/un_subscribe_remind"
 * */
telegram.onText(/\/un_subscribe_remind/, (message) => {
  redis.hdel(SUBSCRIBE_REMIND_LIST, message.chat.id, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    telegram.sendMessage(message.chat.id, 'Reminder unsubscribe successfully!');
  });
});

/** Quản lý api
 * Command "/manager_api"
 */
telegram.onText(/\/manager_api/, (msg, match) => {
  telegram.sendMessage(msg.chat.id, 'Choose', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'List api',
            callback_data: 'list_api'
          }
        ],
        [
          {
            text: 'Add api',
            callback_data: 'add_api'
          }
        ],
        [
          {
            text: 'Delete api',
            callback_data: 'delete_api'
          }
        ]
      ]
    }
  });
});

/**
 * Check reply từ user khi click vào các keyboard từ quản lý api
 */
telegram.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  if (callbackQuery.data === 'list_api') {
    redis.hkeys(API_URL_LIST, (error, response) => {
      if (error) {
        console.error(error);
        return;
      }
      if (response.length) {
        const replyMessage = response.join('\n');
        telegram.sendMessage(msg.chat.id, replyMessage);
      } else {
        telegram.sendMessage(msg.chat.id, 'List api is empty!');
      }
    });
  } else if (callbackQuery.data === 'add_api') {
    telegram.answerCallbackQuery(callbackQuery.id).then(() => {
      telegram.sendMessage(msg.chat.id, 'Please enter api url', {
        reply_markup: JSON.stringify({
          force_reply: true
        })
      });
    });
  } else if (callbackQuery.data === 'delete_api') {
    telegram.answerCallbackQuery(callbackQuery.id).then(() => {
      telegram.sendMessage(msg.chat.id, 'Please enter api url to delete', {
        reply_markup: JSON.stringify({
          force_reply: true
        })
      });
    });
  }
});

/**
 * Check reply từ user khi trả lời thêm hoặc xóa api
 */
telegram.on('message', (callbackQuery) => {
  const { reply_to_message, text, chat } = callbackQuery;
  if (!!reply_to_message) {
    if (reply_to_message.text === 'Please enter api url') {
      redis.hset(API_URL_LIST, text, 1, (error, response) => {
        if (error) {
          console.error(error);
          return;
        }
        telegram.sendMessage(chat.id, 'Add api url successfully!');
      });
    } else if (reply_to_message.text === 'Please enter api url to delete') {
      redis.hdel(API_URL_LIST, text, (error, response) => {
        if (error) {
          console.error(error);
          return;
        }
        telegram.sendMessage(chat.id, 'Delete api url successfully!');
      });
    }
  }
});

export default telegram;
