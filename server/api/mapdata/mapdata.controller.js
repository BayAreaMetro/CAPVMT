/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mapdata              ->  index
 * POST    /api/mapdata              ->  create
 * GET     /api/mapdata/:id          ->  show
 * PUT     /api/mapdata/:id          ->  update
 * DELETE  /api/mapdata/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Mapdata from './mapdata.model';
var sql = require('mssql');
var config = require('./../../config/environment');


// function respondWithResult(res, statusCode) {
//   statusCode = statusCode || 200;
//   return function(entity) {
//     if (entity) {
//       res.status(statusCode).json(entity);
//     }
//   };
// }

// function saveUpdates(updates) {
//   return function(entity) {
//     var updated = _.merge(entity, updates);
//     return updated.save()
//       .then(updated => {
//         return updated;
//       });
//   };
// }

// function removeEntity(res) {
//   return function(entity) {
//     if (entity) {
//       return entity.remove()
//         .then(() => {
//           res.status(204).end();
//         });
//     }
//   };
// }

// function handleEntityNotFound(res) {
//   return function(entity) {
//     if (!entity) {
//       res.status(404).end();
//       return null;
//     }
//     return entity;
//   };
// }

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

exports.getVMTplace = function(req, res) {
    var place = parseInt(req.params.id);
    //var place = 1;
    var request = new sql.Request(config.mssql.connection);
    var query = "SELECT ID, CityName, County, WKT FROM [Places_VW] WHERE (ID = " + place + ")";
    request.query(query, function(err, vmtplace) {
        if (err) {
            return handleError(res, err);
        }
        if (!vmtplace) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(vmtplace);
    });

}

exports.getVMTtaz = function(req, res) {
    var place = parseInt(req.params.id);
    var placeStr = req.params.id;
    var isCounty = req.params.isCounty;
    var query;

    if (isCounty === 'yes') {
        query = "SELECT ID, CityName, taz_key, WKT FROM [TAZs_VW] WHERE COUNTY_FIP = '" + placeStr + "'";
    } else {
        query = "SELECT ID, CityName, taz_key, WKT FROM [TAZs_VW] WHERE (ID = " + place + ")";
    }
    var request = new sql.Request(config.mssql.connection);
    request.query(query, function(err, vmttaz) {
        if (err) {
            return handleError(res, err);
        }
        if (!vmttaz) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(vmttaz);
    });

}

exports.getVMTurbantaz = function(req, res) {
    var place = parseInt(req.params.id);
    var placeStr = req.params.id;
    console.log(place);
    console.log(placeStr);
    var query;
    if (req.params.isCounty === 'yes') {
        placeStr = parseInt(placeStr.substr(2));
        console.log(placeStr);
        query = "SELECT ID, CityName, taz_key, WKT FROM [UrbanizedTAZs_VW] WHERE COUNTY_FIP = " + placeStr;
        console.log(query);
    } else {
        query = "SELECT ID, CityName, taz_key, WKT FROM [UrbanizedTAZs_VW] WHERE (ID = " + place + ")";
    }
    var request = new sql.Request(config.mssql.connection);
    request.query(query, function(err, vmtutaz) {
        if (err) {
            return handleError(res, err);
        }
        if (!vmtutaz) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(vmtutaz);
    });

}