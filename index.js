//set up
const express = require('express');
const server = express();
const startFrom = require('./server.js');
//port
const port = 5000;
//global middleware
server.use(express.json());
server.use(startFrom);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});