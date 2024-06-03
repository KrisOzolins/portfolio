// System packages
const express = require('express');
const http = require('http'); // Required for socket.io.
const { Server } = require('socket.io'); // Required for socket.io.
const fs = require('fs');
const path = require('path');
const os = require('os');
const cluster = require('cluster');
const HttpStatusCode = require('axios').HttpStatusCode;
const chalk = require('chalk');

// Other includes
const Scheduler = require('./jobs/Scheduler');
const db = require('./models');
const routes = require('./routes');
const handleSocketIO = require('./socket');

// Config
require('dotenv').config();
const config = require('./config');
const corsOptions = {
  origin: '*', // Allow only this origin to access.
  // optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204.
};

// Constants
const PORT = config.port;

// Init Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions, // Need to explicitly set CORS options for Socket.io as well.
});

// Other setup
// ...

// Middleware
require('./middleware')(app, corsOptions);

// Config the app/server
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api', routes); // Mount the API routes at /api so all routes start with /api.
app.use(express.static('public')); // Serve MDs from public dir.
// Serve the static files from the Next.js app. Currently handled by Nginx.
// app.use(express.static(path.join(__dirname, '../build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });
// Catch-all / errors.
app.use('*', (req, res, next) => {
  res.status(HttpStatusCode.NotFound).json({ message: 'Not found.' });
});

// Start all the servers (HTTP, socket.io, DB, etc.).
(async () => {
  try {
    Scheduler.setup();
    console.log(` ${chalk.green(`✓`)} Scheduler has been started...`);

    // Always attempt to synchronize the database according to the model definitions.
    await db.sequelize.sync({ alter: true });
    console.log(` ${chalk.green(`✓`)} Database synced.`);

    server.listen(PORT, () => {
      console.log(` ${chalk.green(`✓`)} Server is listening on port ${PORT}`);
    });

    io.on('connection', (socket) => handleSocketIO(io, socket));
  } catch (error) {
    console.error('Failed to synchronize the database:', error);

    // Optionally, exit the process if the error is critical.
    // process.exit(1);
  }
})();
