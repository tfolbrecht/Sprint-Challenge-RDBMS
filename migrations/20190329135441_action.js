exports.up = function (knex, Promise) {
  knex.schema.createTable('actions', function (table) {
    table.increments();
    table.string('ActionDescription').notNullable();
    table.text('Notes').notNullable();
    table.boolean('Done').notNullable();
  })
};

exports.down = function (knex, Promise) {

};