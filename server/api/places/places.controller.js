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


//Mongoose stuff not used
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
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// // Gets a list of Placess
// export function index(req, res) {
//   return Places.find().exec()
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Gets a single Places from the DB
// export function show(req, res) {
//   return Places.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Creates a new Places in the DB
// export function create(req, res) {
//   return Places.create(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }

// // Updates an existing Places in the DB
// export function update(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   return Places.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Deletes a Places from the DB
// export function destroy(req, res) {
//   return Places.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }

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