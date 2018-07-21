exports.seed = (knex, Promise) => {
  knex('happy_hours').del()
  return knex('restaurants').del()
    .then(() => {
      return Promise.all([
        knex('restaurants').insert([
          {
            name: 'Brothers Bar',
            address: '1920 Market St',
            phone: '(303)297-2767',
            website: 'http://www.brothersbar.com/denver-co/',
            city: 'Denver',
            state: 'CO',
            zip_code: 80202,
            restaurant_image: 'http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Stapleton.jpg',
            latitude: '39.752816',
            longitude: '-104.993984'
          }
        ])
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
