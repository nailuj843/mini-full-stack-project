
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todolist').del()
    .then(function () {
      // Inserts seed entries
      return knex('todolist').insert([
        {todoitem: 'get the mail'},
        {todoitem: 'mow the grass'}
      ]);
    });
};
