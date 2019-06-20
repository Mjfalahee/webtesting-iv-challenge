
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('superheroes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('superheroes').insert([
        {name: 'Iron Man', power: 'Genius and Rich'},
        {name: 'The Incredible Hulk', power: 'Mean and Green'},
        {name: 'Thor, God of Thunder', power: 'Nice Hair and Immortal?'}
      ]);
    });
};
