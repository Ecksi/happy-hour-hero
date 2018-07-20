exports.seed = (knex, Promise) => {
  return knex('food_specials').del()
  .then(() => knex('drink_specials').del())
  .then(() => knex('restaurants').del())
  .then(() => knex('happy_hours').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert([{
          name: 'Brothers Bar',
          address: '1920 Market St',
          phone: '3032972767',
          website: 'http://www.brothersbar.com/denver-co/',
          city: 'Denver',
          state: 'CO',
          zip_code: 80202,
          restaurant_image: 'http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Stapleton.jpg'
        }
      ])
      .then(drinks  => {
        return knex('drink_specials').insert([
          {
            name: '2-for-1 drinks',
            best_deal: true
          },
          {
            name: '$5 choose your own',
            best_deal: false
          },
          {
            name: '$3 Vegas Bombs',
            best_deal: true
          },
          {
            name: '$3 U-call-its',
            best_deal: true
          },
          {
            name: '$3 Red Headed Shots',
            best_deal: false
          },
          {
            name: '$2 Domestic Taps & Well',
            best_deal: true
          },
          {
            name: '$1 Domestic Taps & Well (**Service Industry Only**)',
            best_deal: false
          },
          {
            name: '$1.50 Miller High Life Bottles',
            best_deal: false
          },
          {
            name: '$3 Double Wells',
            best_deal: true
          },
          {
            name: '$3 Jager Bombs',
            best_deal: false
          },
          {
            name: '$2 Well Drinks, Bud Light & Coors Light Taps',
            best_deal: true
          },
          {
            name: '$5 32oz. Triple Wells or L.I.T.s',
            best_deal: false
          },
          {
            name: 'LADIES NIGHT - Ladies drink FREE (8pm-11pm) - Wells, Domestic Drafts or House Wines',
            best_deal: true
          },
          {
            name: '$5 Jack Daniels Shots',
            best_deal: false
          },
          {
            name: '$4 Bombs - Jager Bomb, Vegas Bomb or Cherry Bomb',
            best_deal: false
          },
        ])
      })
      .then(food => {
        return knex('food_specials').insert([
          {
            name: '25¢ wings',
            best_deal: true
          },
          {
            name: '$2 Cheeseburger',
            best_deal: true
          }
        ])
      })
      .then(happyHour => {
        return knex('happy_hours').insert([
          {
            day: 'Monday',
            start_time: '4PM',
            end_time: '8PM',
            restaurant_id: restaurants[0],
            food_specials_id: null,
            drink_specials_id: drink_specials[0],
          },
          { 
            day: 'Thursday',
            start_time: '8PM',
            end_time: '2AM',
            restaurant_id: restaurants[0],
            food_specials_id: food_specials[1],
            drink_specials_id: drink_specials[1],
          },
          {
            day: 'Thursday',
            start_time: '4PM',
            end_time: '8PM',
            restaurant_id: restaurants[0],
            food_specials_id: food_specials[1],
            drink_specials_id: drink_specials[8],
          }
        ])
      })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
    ]);
  })
  .catch(error => console.log(`Error seeding data: ${error}`))
};