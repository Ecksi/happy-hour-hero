const happy_hour_data = require('../data/z_happy_hour_data');

exports.seed = function (knex, Promise) {
  let restaurant_id;
  let food_specials_id;
  let drink_specials_id;

  return knex('happy_hours').del()
    .then(() => {
      return Promise.all([
        knex('restaurants').select()
          .then(restaurant => (restaurant_id = restaurant))
      ]);
    })
    .then(() => {
      return Promise.all([
        knex('drink_specials').select()
          .then(drink_specials => (drink_specials_id = drink_specials))
      ]);
    })
    .then(() => {
      return Promise.all([
        knex('food_specials').select()
          .then(food_specials => (food_specials_id = food_specials))
      ]);
    })
    .then(() => {
      return Promise.all([
        knex('happy_hours').insert(happy_hour_data)
      ]);
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`));
}