exports.up = function (knex, Promise) {
  return knex.schema.createTable('actions', function (table) {
    table.increments();
    table.string('ActionDescription').notNullable();
    table.string('project_id').notNullable();
    table.text('Notes').notNullable();
    table.boolean('Done').notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('actions')
};