
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {Name: 'Project 1', Description: "Project 1 description",  Done: false}
      ]);
    });
};
