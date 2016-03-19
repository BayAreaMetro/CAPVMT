/**
 * Main application file
 */

'use strict';
var sql = require('mssql');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var express = require('express');
//var mongoose = require('mongoose');
var config = require('./config/environment');



// sql.connect(config.mssql.config, function(err) {
//     if (err) {
//         console.log('sql connection error: ' + err);
//     }
//     console.log('connected!!!');
//     var request = new sql.Request();
//     request.query('SELECT County_ID as value, County_Name as text FROM dbo.County_Code_LU', function(err, recordset) {
//         if (err) {
//         	console.log(err);
//         } 

//         console.dir(recordset);
//     });

// });


// Setup server
var app = express();
var server = require('http').createServer(app);
// var socketio = require('socket.io')(server, {
//     serveClient: config.env !== 'production',
//     path: '/socket.io-client'
// });
// require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;