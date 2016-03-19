'use strict';

var express = require('express');
var controller = require('./places.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/vmtplace/:id', controller.getVMTplaces);

module.exports = router;
