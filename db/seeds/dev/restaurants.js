const restaurant_data = require('../data/restaurant_data');

exports.seed = (knex, Promise) => {
  return knex('happy_hours').del()
    .then(() => knex('restaurants').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert(restaurant_data)
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
