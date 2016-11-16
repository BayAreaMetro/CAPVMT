'use strict';

var express = require('express');
var controller = require('./vmt.controller');

var router = express.Router();

router.get('/:id/:mr', controller.index);
router.get('/', controller.vmtapi);

//router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;