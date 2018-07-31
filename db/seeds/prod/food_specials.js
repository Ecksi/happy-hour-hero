const food_data = require('../data/food_data');

exports.seed = (knex, Promise) => {
  return knex('happy_hours').del()
    .then(() => knex('food_specials').del())
    .then(() => {
      return Promise.all([
        knex('food_specials').insert(food_data)
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
