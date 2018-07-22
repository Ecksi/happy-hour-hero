exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurants', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('address');
      table.string('phone');
      table.string('website');
      table.string('city');
      table.string('state');
      table.integer('zip_code');
      table.string('restaurant_image');
      table.string('latitude');
      table.string('longitude')
      table.timestamps(true, true);
    }),

    knex.schema.createTable('drink_specials', table => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('best_deal').notNullable().defaultTo(false);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('food_specials', table => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('best_deal').notNullable().defaultTo(false);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('happy_hours', table => {
      table.increments('id').primary();
      table.string('day');
      table.string('start_time');
      table.string('end_time');
      table.integer('restaurant_id').unsigned()
      table.foreign('restaurant_id').references('restaurants.id');
      table.integer('drink_specials_id').unsigned()
      table.foreign('drink_specials_id').references('drink_specials.id');
      table.integer('food_specials_id').unsigned()
      table.foreign('food_specials_id').references('food_specials.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('happy_hours'),
    knex.schema.dropTable('food_specials'),
    knex.schema.dropTable('drink_specials'),
    knex.schema.dropTable('restaurants'),
  ]);
};
