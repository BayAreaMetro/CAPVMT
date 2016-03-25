'use strict';

var express = require('express');
var controller = require('./mapdata.controller');

var router = express.Router();

// router.get('/', controller.index);
router.get('/vmtplace/:id', controller.getVMTplace);
router.get('/vmttaz/:id', controller.getVMTtaz);
router.get('/vmturbantaz/:id', controller.getVMTurbantaz);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
