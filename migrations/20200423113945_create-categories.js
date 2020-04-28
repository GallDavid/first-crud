exports.up = (knex) => {
  return knex.schema.createTable('categories', (table) => {
    table.increments();
    table.string('name');
    table.enu('status', ['important', 'freetime', 'family']);
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('categories');
};
