exports.up = (knex) => {
  return knex.schema.table('users', (table) => {
    table.integer('groupId').unsigned().references('groups.id');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
