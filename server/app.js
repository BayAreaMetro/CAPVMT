/**
 * Main application file
 */

'use strict';
var sql = require('mssql');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import express from 'express';
// import mongoose from 'mongoose';
// mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
