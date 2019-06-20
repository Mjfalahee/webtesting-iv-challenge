const express = require('express');

const heroDB = require('./data/models/superheroesModel');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        message: 'Api is online'
    });
});

server.get('/api/superheroes', (req, res) => {
    heroDB.getAll()
        .then(heroes => {
            res.status(200).json(heroes);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.get('/api/superheroes/:id', (req, res) => {
    heroDB.findById(req.params.id)
        .then(hero => {
            res.status(200).json(hero);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.post('/api/superheroes', (req, res) => {
    heroDB.insert(req.body)
        .then(hero => {
            res.status(201).json(hero);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.delete('/api/superheroes/:id', (req, res) => {
    heroDB.remove(req.params.id)
        .then(hero => {
            res.status(200).json({
                message: `${hero} hero removed from the database`});
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


module.exports = server;