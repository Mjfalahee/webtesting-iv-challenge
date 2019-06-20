
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('superheroes', tbl => {
        tbl.increments();
        tbl.string('name', 255).notNullable();
        tbl.string('power', 255).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('superheroes');
};
