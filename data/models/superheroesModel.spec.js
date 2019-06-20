const db = require('../dbConfig');
const heroDB = require('./superheroesModel');

describe('superheroes model', () => {
    beforeEach(async () => {
        await db('superheroes').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

})