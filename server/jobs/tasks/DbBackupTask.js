// const db = require('../models');
const config = require('../../config');
const DbBackupCommand = require('../../commands/DBBackup');

class DbBackupTask {
  static run() {
    console.log(`${new Date().toString()}: Running DB backup task...`);

    // Task logic here...

    DbBackupCommand.backupMySQL();
  }
}

module.exports = DbBackupTask;
