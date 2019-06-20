const db = require('../dbConfig');

module.exports = {
    insert,
    getAll,
    findById,
    remove
};


function insert(hero) {
    return db('superheroes')
        .insert(hero, 'id')
        .then(ids => {
            return db('superheroes')
                .where({id: ids[0]})
                .first();
        });
}

function getAll() {
    return db('superheroes');
}

function findById(id) {
    return db('superheroes')
        .where({ id })
        .first();
}

function remove(id) {
    return db('superheroes')
        .where({ id })
        .del();
}
