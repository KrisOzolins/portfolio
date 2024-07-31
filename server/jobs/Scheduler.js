const cron = require('node-cron');
const DbBackupTask = require('./tasks/DbBackupTask');

class Scheduler {
  static setup() {
    // Schedule DbBackupTask to run every day.
    cron.schedule('0 1 * * *', () => {
      // DbBackupTask.run(); // todo: Finish & test this.
    });

    // Inline task, running every minute.
    cron.schedule('* * * * *', () => {
      console.log(`${new Date().toString()}: Running an inline task every minute...`);
      // Inline task logic here...
    });
  }
}

module.exports = Scheduler;
