exports.seed = (knex, Promise) => {
  knex('happy_hours').del()
  return knex('drink_specials').del()
    .then(() => {
      return Promise.all([
        knex('drink_specials').insert([
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
            best_deal:  false
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
          .then(() => console.log('Seeding complete!'))
          .catch(error => console.log(`Error seeding data: ${error}`))
      ]);
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
