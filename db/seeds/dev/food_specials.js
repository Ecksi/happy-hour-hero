exports.seed = (knex, Promise) => {
  knex('happy_hours').del()
  return knex('food_specials').del()
    .then(() => {
      return Promise.all([
        knex('food_specials').insert([
          {
            name: '25¢ wings',
            best_deal: true
          },
          {
            name: '$2 Cheeseburger',
            best_deal:  true
          }
        ])
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
