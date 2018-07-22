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
        knex('happy_hours').insert([
          {
            day: 'Monday',
            start_time: 1600,
            end_time: 2000,
            drink_specials_id: drink_specials_id[0].id,
            food_specials_id: food_specials_id[1].id,
            restaurant_id: restaurant_id[2].id,
          },
          {
            day: 'Friday',
            start_time: 1900,
            end_time: 0000,
            drink_specials_id: drink_specials_id[8].id,
            food_specials_id: null,
            restaurant_id: restaurant_id[0].id,
          },
          {
            day: 'Wednesday',
            start_time: 2000,
            end_time: 0200,
            drink_specials_id: drink_specials_id[5].id,
            food_specials_id: food_specials_id[0].id,
            restaurant_id: restaurant_id[1].id,
          },
        ])
      ]);
    })
    .then(() => console.log('Seeding complete!'))
    .catch(error => console.log(`Error seeding data: ${error}`));
}