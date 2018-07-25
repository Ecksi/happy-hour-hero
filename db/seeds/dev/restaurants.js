exports.seed = (knex, Promise) => {
  return knex('happy_hours').del()
    .then(() => knex('restaurants').del())
    .then(() => {
      return Promise.all([
        knex('restaurants').insert([
        { 
          name: 'Brothers Bar',
          address: '1920 Market St',
          phone: '(303) 297-2767',
          website: 'http://www.brothersbar.com/denver-co/',
          city: 'Denver',
          state: 'CO',
          zip_code: 80202,
          restaurant_image: 'http://www.brothersbar.com/wp-content/uploads/2015/10/GALLERY-Stapleton.jpg',
          latitude: '39.752816',
          longitude: '-104.993984'
        },
        {
          name: 'Hapa Sushi Grill and Sake Bar',
          address: '1514 Blake St',
          phone: '(720) 354-5058',
          website: 'https://hapasushi.com/pages/lodo',
          city: 'Denver',
          state: 'CO',
          zip_code: 80202,
          restaurant_image: 'https://images2.westword.com/imager/photos-hapa-sushi-grill-and-sake-bar-roll/u/original/6450005/hapa_sushi_05.jpg',
          latitude: '39.7498',
          longitude: '-104.9999'
        },
        {
          name: 'Falling Rock Tap House',
          address: '1919 Blake St',
          phone: '(303) 293-8338',
          website: 'http://fallingrocktaphouse.com/',
          city: 'Denver',
          state: 'CO',
          zip_code: 80202,
          restaurant_image: 'https://www.hereforthebeer.com/wp-content/uploads/2018/03/150-1.jpg',
          latitude: '39.7539',
          longitude: '-104.9955'
        },
      ])
      .then(() => console.log('Seeding complete!'))
      .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
