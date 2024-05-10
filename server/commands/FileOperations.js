#!/usr/bin/env node

// Node.js based file manipulation command line script
const yargs = require('yargs'); // Or use commander.js.
const sh = require('shelljs');
const upath = require('upath');

class FileOperations {
  constructor() {
    this.argv = yargs
      .usage('$0 <cmd> [args]')
      .command('copy [source] [destination]', 'Copy a file from source to destination', (yargs) => {
        yargs.positional('source', {
          type: 'string',
          describe: 'Source file path'
        }).positional('destination', {
          type: 'string',
          describe: 'Destination file path'
        })
      }, (argv) => {
        this.copyFile(argv.source, argv.destination);
      })
      .help()
      .alias('help', 'h')
      .argv;
  }

  copyFile(source, destination) {
    if (!source || !destination) {
      console.log('Source and destination paths are required');
      return;
    }

    if (sh.cp(source, destination).code !== 0) {
      sh.echo('Error: Copy failed');
      sh.exit(1);
    } else {
      sh.echo(`File copied from ${source} to ${destination}`);
    }
  }
}

new FileOperations();

// Make the script executable with the following command: chmod +x FileOperations.js
// Run the script with the following command: ./FileOperations.js copy --source=<source_file_path> --destination=<destination_file_path>
// The yargs library automatically generates helpful output for the --help flag, showing the available commands and options.
