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

server.get('/api/superheroes/:id', ValidateId, (req, res) => {
    res.status(200).json(req.hero);
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

//middleware

function ValidateId(req, res, next) {
    if (req.params.id) {
        heroDB.findById(req.params.id)
            .then(hero => {
                if (hero.name.length > 0) {
                    req.hero = hero;
                    next();
                } else {
                    res.status(404).json({
                        message: 'No hero with that id.'
                    });
                }
            })
            .catch(error => {
                res.status(404).json({
                    message: 'Error finding a hero with that ID.',
                });
            })
    }
}


module.exports = server;