exports.seed = (knex) => {
  return knex('groups').insert([
    {
      name: 'Theta',
      description: 'Flow',
      location: 'Szeged',
      maximalSize: 14
    },
    {
      name: 'Eta',
      description: 'Flow',
      location: 'Pest',
      maximalSize: 13
    },
    {
      name: 'Alpha',
      description: 'Flow',
      location: 'Kecskemet',
      maximalSize: 3
    },
    {
      name: 'Beta',
      description: 'Flow',
      location: 'Ozd',
      maximalSize: 8
    },
    {
      name: 'Gamma',
      description: 'Flow',
      location: 'Pecs',
      maximalSize: 5
    }
  ]);
};
