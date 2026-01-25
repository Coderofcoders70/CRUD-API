const express = require('express');
const router = express.Router();
const empController = require('../controller/empController');

router.route('/')
.get(empController.getAllEmployees)
.post(empController.createNewEmployee)

router.route('/:id')
.get(empController.getEmployeeId)
.put(empController.updateEmployee)
.delete(empController.deleteEmployee)

module.exports = router;