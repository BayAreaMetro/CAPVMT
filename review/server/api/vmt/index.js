'use strict';

var express = require('express');
var controller = require('./vmt.controller');

var router = express.Router();

//router.get('/', controller.index);
router.get('/vmtdata/:id', controller.getVMTdata);


module.exports = router;
