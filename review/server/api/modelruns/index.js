'use strict';

var express = require('express');
var controller = require('./modelruns.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/getmodelrun/:id', controller.getModelRun);


module.exports = router;
