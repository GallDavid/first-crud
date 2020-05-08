exports.seed = (knex) => {
  knex('todos').insert([
    {
      name: 'First',
      description: 'First',
      status: 'deleted',
      userId: 1,
      categroyId: 1
    },
    {
      name: 'Second',
      description: 'Second',
      status: 'in-progress',
      userId: 2,
      categroyId: 2
    },
    {
      name: 'Third',
      description: 'Third',
      status: 'done',
      userId: 3,
      categroyId: 3
    },
    {
      name: 'Fourth',
      description: 'Fourth',
      status: 'done',
      userId: 4,
      categroyId: 4
    },
    {
      name: 'Fifth',
      description: 'Fifth',
      status: 'done',
      userId: 5,
      categroyId: 5
    }
  ]);
};
