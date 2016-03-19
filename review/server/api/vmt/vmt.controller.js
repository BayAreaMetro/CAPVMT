/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vmt              ->  index
 * GET     /api/vmt/:id          ->  show
 */

'use strict';

import _ from 'lodash';
import Vmt from './vmt.model';
var sql = require('mssql');
var config = require('./../../config/environment');



function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Get VMT Data by place and scenario year
exports.getVMTdata = function(req,res){
var place = parseInt(req.params.id);
var mr = "N'" + req.params.mr + "'";

var request = new sql.Request(config.mssql.connection);
    var query = "SELECT Lives, Works, Persons, Inside, Partially_In, Outside, Total, CityName, model_run as Model_Run, tazlist FROM VMT_Results WHERE (placeid = " + place + ") AND (model_run = " + mr + ") ORDER BY CityName, SortOrder2, SortOrder3";
    request.query(query, function(err, vmtdata) {
        if (err) {
            return handleError(res, err);
        }
        if (!vmtdata) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(vmtdata);
    });

}
