exports.seed = (knex) => {
  knex('categories').insert([
    {
      name: 'Red',
      status: 'important'
    },
    {
      name: 'Blue',
      status: 'family'
    },
    {
      name: 'Green',
      status: 'important'
    },
    {
      name: 'Yellow',
      status: 'family'
    },
    {
      name: 'White',
      status: 'freetime'
    }
  ]);
};
