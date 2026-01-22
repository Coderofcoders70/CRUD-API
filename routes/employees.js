const express = require('express');
const router = express.Router();
const empController = require('../controller/empController');

router.route('/')
.get(empController.getAllEmployees)
.post(empController.createNewEmployee)
.put(empController.updateEmployee)
.delete(empController.deleteEmployee)

router.route('/:id')
.get(empController.getEmployeeId);

module.exports = router;