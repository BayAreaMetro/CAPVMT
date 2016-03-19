'use strict';
var mssql = require('mssql');

var config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PWD,
    server: process.env.SERVER, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DATABASE,
    connectionTimeout: 30000,
    requestTimeout: 30000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};
var options = {
    table: '[sessions]' // Table to use as session store. Default: [sessions]
};



var connection = new mssql.Connection(config, function(err) {
    if (err) {

        console.log(err);
        console.log('is the error');
    }

});



// Development specific configuration
// ==================================
module.exports = {

    mssql: {
        config: config,
        options: options,
        connection: connection
    },
    sendgrid: {
        user: process.env.SENDGRID_USER,
        access: process.env.SENDGRID_PWD
    },
    github: {
        user: process.env.GITHUB_USER,
        access: process.env.GITHUB_PWD
    }
};
