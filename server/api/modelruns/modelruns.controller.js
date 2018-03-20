/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/modelruns              ->  index
 * POST    /api/modelruns              ->  create
 * GET     /api/modelruns/:id          ->  show
 * PUT     /api/modelruns/:id          ->  update
 * DELETE  /api/modelruns/:id          ->  destroy
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

// Gets a list of Model Runs
// //test route: http://localhost:9000/api/modelruns
exports.index = function(req,res){
var request = new sql.Request(config.mssql.connection);
    var query = "SELECT text, value FROM ScenarioYear Order By text Asc";
    request.query(query, function(err, mrdata) {
        if (err) {
            return handleError(res, err);
        }
        if (!mrdata) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(mrdata);
    });

}
