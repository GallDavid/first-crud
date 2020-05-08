const bcrypt = require('bcrypt');
exports.seed = (knex) => {
  return knex('users').insert([
    {
      firstName: 'Jakab',
      lastName: 'Gipsz',
      email: 'jakab@gipsz.com',
      password: bcrypt.hashSync('abc123', 10),
      age: 33,
      groupId: 1,
      role: 'admin'
    },
    {
      firstName: 'Tasi',
      lastName: 'Test',
      email: 'tasi@teszt.com',
      password: bcrypt.hashSync('asdf123', 10),
      age: 18,
      groupId: 2,
      role: 'user'
    },
    {
      firstName: 'Feri',
      lastName: 'Test',
      email: 'feri@teszt.com',
      password: bcrypt.hashSync('asdf123', 10),
      age: 25,
      groupId: 3,
      role: 'user'
    },
    {
      firstName: 'Mate',
      lastName: 'Test',
      email: 'mate@teszt.com',
      password: bcrypt.hashSync('asdf123', 10),
      age: 46,
      groupId: 4,
      role: 'user'
    },
    {
      firstName: 'Peti',
      lastName: 'Test',
      email: 'peti@teszt.com',
      password: bcrypt.hashSync('asdf123', 10),
      age: 29,
      groupId: 5,
      role: 'user'
    }
  ]);
};
