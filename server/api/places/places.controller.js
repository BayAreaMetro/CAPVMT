/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/places              ->  index
 * POST    /api/places              ->  create
 * GET     /api/places/:id          ->  show
 * PUT     /api/places/:id          ->  update
 * DELETE  /api/places/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Places from './places.model';
var sql = require('mssql');
var config = require('./../../config/environment');

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Places
exports.index = function (req, res) {
        //http://localhost:9000/api/places
        var request = new sql.Request(config.mssql.connection);
        var query = "SELECT ID as value, CityName as text FROM Place_Lookup";
        request.query(query, function (err, places) {
            if (err) {
                return handleError(res, err);
            }
            if (!places) {
                return res.status(404).send('Not Found');
            }
            res.status(200).json(places);
        });

    }
    //Selects Corrrespondence between Places and TAZs (1454).  Does not include whole counties, only the CDPs and County Remainder areas.
exports.placeTAZ1454 = function (req, res) {
        //http://localhost:9000/api/places
        var request = new sql.Request(config.mssql.connection);
        var query = "SELECT * FROM CAPVMT.Place_TAZ1454_Correspondence";
        request.query(query, function (err, places) {
            if (err) {
                return handleError(res, err);
            }
            if (!places) {
                return res.status(404).send('Not Found');
            }
            res.status(200).json(places);
        });

    }
    //Selects correspondence between Places (161- which includes CDP areas, County Remainder Areas, and whole counties- includes CDPs Incorporated Areas and County remainder Areas) and TAZs (1454)
exports.placeTAZ = function (req, res) {
    //http://localhost:9000/api/places
    var request = new sql.Request(config.mssql.connection);
    var query = "SELECT * FROM CAPVMT.Place_TAZ_Correspondence";
    request.query(query, function (err, places) {
        if (err) {
            return handleError(res, err);
        }
        if (!places) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(places);
    });

}