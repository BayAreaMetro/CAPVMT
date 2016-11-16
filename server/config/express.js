/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
// import connectMongo from 'connect-mongo';
// import mongoose from 'mongoose';
// var mongoStore = connectMongo(session);

// Enables CORS
var enableCORS = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

export default function (app) {
    var env = app.get('env');

    app.set('views', config.root + './../views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(compression());
    app.use(enableCORS);
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(passport.initialize());

    // Persist sessions with mongoStore / sequelizeStore
    // We need to enable sessions for passport-twitter because it's an
    // oauth 1.0 strategy, and Lusca depends on sessions
    app.use(session({
        secret: config.secrets.session,
        saveUninitialized: true,
        resave: false //,
            // store: new mongoStore({
            //   mongooseConnection: mongoose.connection,
            //   db: 'capvmt'
            // })
    }));

    /**
     * Lusca - express server security
     * https://github.com/krakenjs/lusca
     */
    if ('test' !== env) {
        app.use(lusca({
            // csrf: {
            //     angular: true
            // },
            xframe: 'SAMEORIGIN',
            hsts: {
                maxAge: 31536000, //1 year, in seconds
                includeSubDomains: true,
                preload: true
            },
            xssProtection: true
        }));
    }



    if ('production' === env) {
        app.use(express.static(path.join(__dirname, './../client')));
        app.set('appPath', path.join(__dirname, './../client'));
        app.use(morgan('dev'));
    }

    if ('development' === env) {
        app.use(require('connect-livereload')());
    }

    if ('development' === env || 'test' === env) {
        app.set('appPath', path.join(config.root, 'client'));
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(app.get('appPath')));
        app.use(morgan('dev'));
        app.use(errorHandler()); // Error handler - has to be last
    }
}