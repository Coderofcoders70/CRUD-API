const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// cors
app.use(cors());

//built-in middleware:-
app.use(express.urlencoded({ extended: false }));

// middleware
app.use(express.json());

// routes
app.use('/employees', require('./routes/employees'));

// Port
app.listen(PORT);

console.log("Listening at Port 3000...");