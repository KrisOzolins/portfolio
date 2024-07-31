#!/usr/bin/env node

// Node.js based database backup command line script.
const yargs = require('yargs');
const config = require('../config');
const { exec } = require('child_process');
const moment = require('moment');
const { Dropbox, Error, files } = require('dropbox');
const fs = require('fs');
const path = require('path');
const EmailService = require('../lib/Email');
const db = require('../models');

class DBBackup {
  constructor() {
    this.filename = `backup-${moment().format('YYYY-MM-DD')}.sql`;
    this.argv = yargs
      .usage('$0 <cmd> [args]')
      .command(
        'backup [type]',
        'Backup the database',
        (yargs) => {
          yargs.positional('type', {
            type: 'string',
            describe: 'Type of database to backup (mysql, postgres)',
          });
        },
        (argv) => {
          if (argv.type === 'mysql') {
            this.backupMySQL();
          } else if (argv.type === 'postgres') {
            this.backupPostgres();
          } else {
            console.log('Please specify a database type to backup.');
          }
        },
      )
      .help()
      .alias('help', 'h').argv;
  }

  backupPostgres() {
    exec(`pg_dump -U ${config.db.username} -h ${config.db.host} ${config.db.database} > ${config.db.database}.sql`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }

      console.log(`Backup successful: ${stdout || 'No output'}`);

      // Send notification.
      // notifier.notify({
      //   title: 'DB Backup Task',
      //   message: 'Backup successful',
      // });

      // Send email.
      // email.send({
      //   subject: 'DB Backup Task',
      //   message: 'Backup successful',
      // });

      // Upload to S3.
      // s3.upload('portfolio.sql');

      // Delete local backup.
      // fs.unlinkSync('portfolio.sql');

      // Log to database.
      // db.Log.create({ message: 'DB backup successful' });

      // Log to console.
      // console.log('DB backup successful');
    });
  }

  backupMySQL() {
    exec(`mysqldump -u ${config.db.username} ${config.db.database} > ${this.filename}`, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }

      // Upload to S3.
      // ...

      // Upload to Dropbox.
      const dbx = new Dropbox({ accessToken: config.dropbox.accessToken });
      // const file = fs.readFileSync(path.join(__dirname, this.filename));
      // const file = fs.readFileSync(path.join('~', this.filename));
      const file = fs.readFileSync(this.filename);
      try {
        const response = await dbx.filesUpload({ path: `/xpl0re-db-backups/${this.filename}`, contents: file });
        console.log('Dropbox upload response:', response);

        // Delete local backup.
        fs.unlinkSync(this.filename);

        db.Log.create({
          relation_id: null,
          relation_type: 'database_backup',
          relation_value: 'success',
          additional_data: {
            filename: this.filename,
            // Include any additional data you want to log, e.g., backup size, duration, etc.
          },
        });
      } catch (error) {
        console.error('Dropbox upload error:', error);

        // Send error notification email.
        await EmailService.sendEmail('db_backup_error', {
          content: {
            error: JSON.stringify(error.error),
            time: moment().format('YYYY-MM-DD HH:mm:ss'),
            file: this.filename,
          },
          to: 'kris.ozolins@gmail.com',
          replyTo: 'kris@krisozolins.com',
          subject: 'Error backing up database.',
        });
      }

      // Send notification.
      // ...

      console.log(`Backup successful: ${stdout || 'No output'}`);
    });

    // console.log('Database backup completed!');
  }
}

const DBBackupInstance = new DBBackup();

module.exports = DBBackupInstance;
