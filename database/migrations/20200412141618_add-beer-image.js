
exports.up = async knex => {
  await knex.schema.createTable( 'BeerImages', table => {
    table.integer('beerId').primary().references('Beers.beerId').onDelete('CASCADE').onUpdate('CASCADE');
    table.string('contentType');
    table.binary('blob');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
  await knex.schema.table( 'Beers', table => {
    table.dropColumn('imageUrl');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable( 'BeerImages' );
  await knex.schema.table( 'Beers', table => {
    table.string('imageUrl');
  });
};
