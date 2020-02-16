
exports.up = async knex => {
  await knex.schema.createTable('Settings', function (table) {
    table.increments('id').primary();
    table.string('numberOfTaps');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('Beers', function (table) {
    table.increments('beerId').primary();
    table.string('name');
    table.string('brewerName');
    table.string('imageUrl');
    table.decimal('abv');
    table.integer('ibu');
    table.text('description');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('Kegs', function (table) {
    table.increments('kegId').primary();
    table.integer('beerId');
    table.foreign('beerId').references('Beers.beerId');
    table.decimal('gallons');
    table.decimal('finishedAt');
    table.integer('totalPourCount');
    table.decimal('totalPourMilliliters');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('Taps', function (table) {
    table.increments('tapIndex').primary();
    table.integer('kegId');
    table.foreign('kegId').references('Kegs.kegId');
    table.string('tapName');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('Pours', function (table) {
    table.increments('pourId').primary();
    table.integer('kegId');
    table.foreign('kegId').references('Kegs.kegId');
    table.integer('beerId');
    table.foreign('beerId').references('Beers.beerId');
    table.integer('tapIndex');
    table.foreign('beerId').references('Taps.tapIndex');
    table.integer('durationSeconds');
    table.integer('tickCount');
    table.decimal('milliliters');
    table.boolean('simulated');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());

    table.index(['kegId'], '' );

  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists('Beers');
  await knex.schema.dropTableIfExists('Kegs');
  await knex.schema.dropTableIfExists('Taps');
  await knex.schema.dropTableIfExists('Pours');
  await knex.schema.dropTableIfExists('Settings');
};
