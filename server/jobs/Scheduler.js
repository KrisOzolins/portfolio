const cron = require('node-cron');
const ExampleTask = require('./tasks/ExampleTask');

class Scheduler {
  static setup() {
    // Schedule ExampleTask to run every hour.
    cron.schedule('0 * * * *', () => {
      ExampleTask.run();
    });

    // Inline task, running every minute.
    cron.schedule('* * * * *', () => {
      console.log(`${new Date().toString()}: Running an inline task every minute...`);
      // Inline task logic here...
    });
  }
}

module.exports = Scheduler;
