import schedule from 'node-schedule';

import telegram from '../bot';
import redis from '../redis';

import { SUBSCRIBE_REMIND_LIST, REMIND_MESSAGE } from '../constants';

// schedule.scheduleJob({ hour: 16, minute: 0, dayOfWeek: 6 }, () => {
//   redis.hkeys(SUBSCRIBE_REMIND_LIST, (error, response) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     for (const telegramId of response) {
//       telegram.sendMessage(telegramId, REMIND_MESSAGE);
//     }
//   });
// });
schedule.scheduleJob('*/1 * * * *', () => {
  redis.hkeys(SUBSCRIBE_REMIND_LIST, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    for (const telegramId of response) {
      telegram.sendMessage(telegramId, REMIND_MESSAGE);
    }
  });
});
