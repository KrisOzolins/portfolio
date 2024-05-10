// Custom scheduler class using https://github.com/harrisiirak/cron-parser
const cronParser = require('cron-parser');
const moment = require('moment');

class Scheduler {
  constructor() {
    this.jobs = [];
  }

  addJob(cron, callback) {
    const interval = cronParser.parseExpression(cron);
    this.jobs.push({ interval, callback });
  }

  start() {
    this.jobs.forEach(job => {
      this.scheduleNext(job);
    });
  }

  scheduleNext(job) {
    try {
      const next = job.interval.next();
      const now = moment();
      const then = moment(next.toDate());
      const timeout = then.diff(now);

      setTimeout(() => {
        job.callback();
        // Schedule the next execution
        this.scheduleNext(job);
      }, timeout);
    } catch (e) {
      console.error('Error scheduling job:', e);
    }
  }
}

module.exports = Scheduler;

// Usage:
const scheduler = new Scheduler();

scheduler.addJob('*/5 * * * *', () => {
  console.log('Running job at', moment().format());
});

scheduler.start();
