/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vmt              ->  index
 * POST    /api/vmt              ->  create
 * GET     /api/vmt/:id          ->  show
 * PUT     /api/vmt/:id          ->  update
 * DELETE  /api/vmt/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Vmt from './vmt.model';
var sql = require('mssql');
var config = require('./../../config/environment');


//Mongoose DB Stuff not used
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

// // Gets a list of Vmts
// export function index(req, res) {
//   return Vmt.find().exec()
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Gets a single Vmt from the DB
// export function show(req, res) {
//   return Vmt.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Creates a new Vmt in the DB
// export function create(req, res) {
//   return Vmt.create(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }

// // Updates an existing Vmt in the DB
// export function update(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   return Vmt.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Deletes a Vmt from the DB
// export function destroy(req, res) {
//   return Vmt.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }

// Get VMT Data by place and scenario year
// //test route: http://localhost:9000/api/vmt/1/2005_03_YYY
// //removed the where clause to return the entire table.
// Will probably need to filter data returned based upon values in the app drop downs
exports.index = function (req, res) {
    var place = parseInt(req.params.id);
    var mr = "N'" + req.params.mr + "'";
    //var place = 1;
    //var mr = "N'2005_03_YYY'";
    ////WHERE (placeid = " + place + ") AND (model_run = " + mr + ")
    var request = new sql.Request(config.mssql.connection);
    var query = "SELECT Lives, Works, Persons, Inside, Partially_In, Outside, Total, CityName, placeid as Place_ID, model_run as Model_Run, tazlist FROM VMT_Results WHERE (placeid = " + place + ") AND (model_run = " + mr + ") ORDER BY CityName, SortOrder2, SortOrder3";
    request.query(query, function (err, vmtdata) {
        if (err) {
            return handleError(res, err);
        }
        if (!vmtdata) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(vmtdata);
    });

}
//Selects VMT by Scenario (Model Run) and Place/County areas.
exports.vmtapi = function (req, res) {
    var request = new sql.Request(config.mssql.connection);
    var query = "SELECT Lives, Works, Persons, Inside, Partially_In, Outside, Total, CityName, placeid as Place_ID, model_run as Model_Run, tazlist FROM VMT_Results ORDER BY CityName, SortOrder2, SortOrder3";
    request.query(query, function (err, vmtdata) {
        if (err) {
            return handleError(res, err);
        }
        if (!vmtdata) {
            return res.status(404).send('Not Found');
        }
        res.status(200).json(vmtdata);
    });

}