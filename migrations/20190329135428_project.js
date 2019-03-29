exports.up = function (knex, Promise) {
  knex.schema.createTable('projects', function (table) {
    table.increments();
    table.string('Name').notNullable();
    table.text('Description').notNullable();
    table.boolean('Done').notNullable();
  })
};

exports.down = function (knex, Promise) {

};