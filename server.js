const express = require('express');

//import routes

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Api is online'
    });
});

//api routes


module.exports = server;