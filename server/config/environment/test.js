'use strict';
var mssql = require('mssql');

var config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PWD,
    server: process.env.SERVER, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DATABASE

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

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/capvmt-test'
  },
    mssql: {
        config: config,
        options: options,
        connection: connection
    },
    sendgrid: {
        user: process.env.SENDGRID_USER,
        access: process.env.SENDGRD_PWD
            //seedDB: true
    },
    github: {
        user: process.env.GITHUB_USER,
        access: process.env.GITHUB_PWD
    },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
