const rfs = require('rotating-file-stream');
const path = require('path');

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, '../storage/log'),
});

module.exports = accessLogStream;
