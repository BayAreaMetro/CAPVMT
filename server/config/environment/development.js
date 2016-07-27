'use strict';
var mssql = require('mssql');
var github = require('octonode');

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

console.log(config);
var options = {
    table: '[sessions]' // Table to use as session store. Default: [sessions]
};



var connection = new mssql.Connection(config, function(err) {
    if (err) {

        console.log(err);
        console.log('is the error');
    }

});

var client = github.client({
    username: process.env.GITHUB_USER,
    password: process.env.GITHUB_PWD
});

var ghrepo = client.repo('MetropolitanTransportationCommission/CAPVMT')

// client.get('/user', {}, function(err, status, body, headers) {
//     console.log(body); //json object
// });

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
        client: client,
        repo: ghrepo
    } //,

    // MongoDB connection options
    // mongo: {
    //   uri: 'mongodb://localhost/capvmt-dev'
    // },

    // // Seed database on startup
    // seedDB: false

};
