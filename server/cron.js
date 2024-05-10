const Scheduler = require('./jobs/Scheduler');

// Start the scheduler
Scheduler.setup();

console.log('Scheduler has been started...');

// Run this file using Node.js (node cron.js).
// This script could also be added to your system's crontab for periodic execution.
// Adding to crontab:
// crontab -e
// 0 * * * * /usr/bin/node /path/to/your-node-app/cron.js
