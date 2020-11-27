import schedule from 'node-schedule';

schedule.scheduleJob({ hour: 16, minute: 0, dayOfWeek: 6 }, () => {
  global.allowedBet = true;
});
