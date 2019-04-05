exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', function (table) {
    table.increments();
    table.string('Name').notNullable();
    table.string('project_id').notNullable();
    table.text('Description').notNullable();
    table.boolean('Done').notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('projects')
};