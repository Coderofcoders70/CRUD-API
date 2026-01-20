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
app.get('/', (req, res) => {
    res.json(data.employees);
});

app.post('/', (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        res.status(400).json("Id not found");
    }

    data.setEmployee([ ...data.employees, newEmployee ]);
    res.status(201).json(data.employees);
});

// Port
app.listen(3000);

console.log("Listening at Port 3000...");