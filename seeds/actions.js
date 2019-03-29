
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {ActionDescription: 'Test', Notes: 'action 1 notes', Done: false}
      ]);
    });
};
