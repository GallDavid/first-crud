exports.up = (knex) => {
  return knex.schema.createTable('todos', (table) => {
    table.increments();
    table.string('name');
    table.string('description');
    table.string('status');
    table.integer('userId').unsigned().references('users.id');
    table.integer('categroyId').unsigned().references('categories.id');
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('todos');
};
