
exports.up = function(knex) {
    return knex.schema.createTable('todolist', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('todoitem').notNullable();
       
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('todolist');
};
