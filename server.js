const express = require('express');
// const path = require('path');
const cors = require('cors');
const app = express();

// Use the data from model 
const data = {}; // Empty object
data.employees = require('./model/employees.json');

// cors
app.use(cors());

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.json(data.employees);
});

// Port
app.listen(3000);

console.log("Listening at Port 3000...");