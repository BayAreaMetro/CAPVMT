'use strict';

var express = require('express');
var controller = require('./places.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/placeTAZ1454', controller.placeTAZ1454);
router.get('/placeTAZ', controller.placeTAZ);

// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;