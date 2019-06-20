const db = require('../dbConfig');
const heroDB = require('./superheroesModel');

describe('superheroes model', () => {
    beforeEach(async () => {
        await db('superheroes').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('insert()', () => {
        it('should insert superheroes into the table', async () => {
            await heroDB.insert({
                name: 'Mr. Fantastic',
                power: 'He can stretch'
            })
            await heroDB.insert({
                name: 'Human Torch',
                power: 'He can fly and harness fire'
            })

            const heroes = await db('superheroes');
            expect(heroes).toHaveLength(2);
        })
        it('should insert the provided superhero', async () => {
            let hero = {
                name: 'Spiderman',
                power: 'Spider stuff'
            }

            let inserted = await heroDB.insert(hero);
            expect(inserted.name).toBe(hero.name);
        })
    })

    describe('remove()', () => {
        it('should remove superheroes from the table', async () => {
            await heroDB.insert({
                name: 'Mr. Fantastic',
                power: 'He can stretch'
            })
            await heroDB.remove(1);
            const heroes = await db('superheroes');
            expect(heroes).toHaveLength(0);
        })
        it('should return 1 removed entry', async () => {
            await heroDB.insert({
                name: 'Mr. Fantastic',
                power: 'He can stretch'
            })
            const removed = await heroDB.remove(1);
            expect(removed).toBe(1);
        })
    })

})