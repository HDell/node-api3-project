//set up
require('dotenv').config(); //this line doesn't necessarily have to be at the top. it just has to come before port=process.env.PORT (because it must come before the environment is called)
//dotenv places a (key-) value on the process.env that gets used below
const express = require('express');
const server = express();
const startFrom = require('./server.js');
//port
const port = process.env.PORT || 5000;
//global middleware
server.use(express.json());
server.use(startFrom);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});