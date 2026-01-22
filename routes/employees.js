const express = require('express');
const router = express.Router();
const empController = require('../controller/empController');

router.route('/')
.get(empController.getAllEmployees);

router.route('/:id')
.get(empController.getEmployeeId);

module.exports = router;