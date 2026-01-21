const express = require('express');
const app = express()
const cors = require('cors');

// Use the data from model 
const data = {
    employees: require('./model/employees.json'),
    setEmployees: function (data) { this.employees = data; }
}

const PORT = process.env.PORT || 3000;

// cors
app.use(cors());

// middleware
app.use(express.json());

// routes
// GET method to fetch all the employees:-
app.get('/employees', (req, res) => {
    res.json(data.employees);
});

// POST method:-
app.post('/employees', (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({"message": "Id not found"});
    }

    data.setEmployees([ ...data.employees, newEmployee ]);
    res.status(201).json(data.employees);
});

// PUT method:-
app.put('/employees', (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
    if (!employee) {
        res.status(400).json({'message': `Given Employee ${req.body.id} not found`});
    }
    if (req.body.firstname) {
        employee.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
        employee.lastname = req.body.lastname;
    }
    const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployees(unsortedArray.sort((a,b) =>  a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
});

// DELETE method:-
app.delete('/employees', (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
    if (!employee) {
        res.status(400).json({'message': `Given Employee ${req.body.id} not found`});
    }
    const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);
});

// Port
app.listen(PORT);

console.log("Listening at Port 3000...");