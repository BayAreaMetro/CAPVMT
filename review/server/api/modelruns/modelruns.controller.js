/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/modelruns              ->  index
 * GET     /api/modelruns/:id          ->  show
 */

'use strict';

import _ from 'lodash';
import Modelruns from './modelruns.model';
var sql = require('mssql');
var config = require('./../../config/environment');


function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Places
exports.index = function(req,res){

var request = new sql.Request(config.mssql.connection);
    var query = "SELECT ID as value, CityName as text FROM Place_Lookup";
    request.query(query, function(err, vmtdata) {
        if (err) {
            return handleError(res, err);
        }
        if (!places) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(places);
    });

}
