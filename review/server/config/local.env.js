'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

//Production Environment
module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: 'capvmt-test-secret',
    GOOGLE_ID: 'app-id',
    GOOGLE_SECRET: 'google-secret',
    NODE_ENV: 'development',
    SQL_USER: 'CAPVMT',
    SQL_PWD: 'GIS@CAPVMT101',
    SERVER: 'gisdb2.c4ttzt2cz0de.us-west-2.rds.amazonaws.com',
    DATABASE: 'CAPVMT',
    SENDGRID_USER: 'mtcgis',
    SENDGRID_PWD: 'GIS@mtc101',
    GITHUB_USER: 'MTCGIS',
    GITHUB_PWD: 'GIS@mtc101',

    // Control debug level for modules using visionmedia/debug
    DEBUG: ''
};