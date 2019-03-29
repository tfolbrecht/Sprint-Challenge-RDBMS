
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {ActionDescription: 'Test',project_id: '1', Notes: 'action 1 notes', Done: false},
        {ActionDescription: 'Test1',project_id: '1', Notes: 'action 2 notes', Done: false},
        {ActionDescription: 'Test3',project_id: '1', Notes: 'action 3 notes', Done: false}
      ]);
    });
};
