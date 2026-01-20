const express = require('express');
const cors = require('cors');
const app = express();

// Use the data from model 
const data = {
    employees: require('./model/employees.json'),
    setEmployee: function (data) { this.employees = data; }
}

// cors
app.use(cors());

// middleware
app.use(express.json());

// routes
// GET method:-
app.get('/', (req, res) => {
    res.json(data.employees);
});

// POST method:-
app.post('/', (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json("Id not found");
    }

    data.setEmployee([ ...data.employees, newEmployee ]);
    res.status(201).json(data.employees);
});

// PUT method:-
app.put('/', (req, res) => {
    const employee = data.employees.find((emp) => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json(`Given Employee ${req.body.id} not found`);
    }
    if (req.body.firstname) {
        employee.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
        employee.lastname = req.body.lastname;
    }
    const filteredArray = data.employees.filter((emp) => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployee(unsortedArray.sort((a,b) =>  a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
});

// Port
app.listen(3000);

console.log("Listening at Port 3000...");