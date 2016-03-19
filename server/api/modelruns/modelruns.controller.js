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

//Mongoose Stuff not used
// // Gets a list of Modelrunss
// export function index(req, res) {
//   return Modelruns.find().exec()
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Gets a single Modelruns from the DB
// export function show(req, res) {
//   return Modelruns.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Creates a new Modelruns in the DB
// export function create(req, res) {
//   return Modelruns.create(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }

// // Updates an existing Modelruns in the DB
// export function update(req, res) {
//   if (req.body._id) {
//     delete req.body._id;
//   }
//   return Modelruns.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// // Deletes a Modelruns from the DB
// export function destroy(req, res) {
//   return Modelruns.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(removeEntity(res))
//     .catch(handleError(res));
// }

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
