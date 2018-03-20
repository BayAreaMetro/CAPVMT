/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/feedback              ->  index
 * POST    /api/feedback              ->  create
 * GET     /api/feedback/:id          ->  show
 * PUT     /api/feedback/:id          ->  update
 * DELETE  /api/feedback/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
// import Feedback from './feedback.model';
var sql = require('mssql');
var config = require('./../../config/environment');

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function saveUpdates(updates) {
    return function(entity) {
        var updated = _.merge(entity, updates);
        return updated.save()
            .then(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Feedbacks
export function index(req, res) {
    return Feedback.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Feedback from the DB
export function show(req, res) {
    return Feedback.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Feedback in the DB
export function create(req, res) {
    var request = new sql.Request(config.mssql.connection);
    console.log(req.body);
    // console.log(config.github.repo);
    var repo = config.github.repo;

    repo.issue({
        "title": "Public Comment",
        "body": req.body.inputComment,
        "assignee": "MTCGIS",
        "labels": [req.body.inputType]
    }, function(err, data, headers) {
        if (err) {
            console.log(err)
            res.json(err);
        }

        res.status(200).json({ status: 'success' });
    }); //issue

}

// Updates an existing Feedback in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Feedback.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Feedback from the DB
export function destroy(req, res) {
    return Feedback.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
