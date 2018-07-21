exports.seed = (knex, Promise) => {
  let restaurants;
  let drink_specials;
  let food_specials;

  return knex('happy_hours').del()
    .then(() => {
      return Promise.all([
        knex('food_specials').select().where('name', '$2 Cheeseburger')
          .then(results => (food_specials = results))
      ]);
    })
    .then(() => {
      return Promise.all([
        knex('drink_specials').select().where('name', '2-for-1 drinks')
          .then(results => (drink_specials = results))
      ]);
    })
    .then(() => {
      return Promise.all([
        knex('restaurants').select().where('name', 'Brothers Bar')
          .then(results => (restaurants = results))
      ]);
    })
    .then(() => {
      return Promise.all([
        knex('happy_hours').insert([
          {
            day: 'Monday',
            start_time: 1600,
            end_time: 2000,
            drink_specials_id: drink_specials[0].id,
            food_specials_id: food_specials[0].id,
            restaurant_id: restaurants[0].id,
          }
        ])
      ])
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`));
    })
};