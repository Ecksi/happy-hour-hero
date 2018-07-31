const drink_data = require('../data/drink_data');

exports.seed = (knex, Promise) => {
  return knex('happy_hours').del()
    .then(() => knex('drink_specials').del())
    .then(() => {
      return Promise.all([
        knex('drink_specials').insert(drink_data)
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
