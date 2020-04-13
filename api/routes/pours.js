const { Pour, Beer, sequelize } = require('../models').models;
const utils = require('../lib/utils');

module.exports = function( app ){
  app.get('/api/pours', _getPours );
  app.get('/api/pours/chart', _getPoursChart );
};

async function _getPours( req, res ){
  let pours = await Pour.findAllWithBeer({ fromDaysAgo: 90, limit: 200 });
  if( pours.length > 0 ){
    pours = pours.map( p => {
      const result = p.toJSON();
      result.beerName = p.Beer.name;
      result.floz = utils.flozFromMilliliters( p.milliliters );
      return result;
    });
  }
  res.send({ pours })
}

async function _getPoursChart( req, res ){
  const sql = `
  SELECT
    date( createdAt, 'localtime', 'start of day' ) as date,
    beerId,
    SUM(milliliters) as millilitersPoured
  FROM "Pours" WHERE createdAt > date('now','-3 months')
  GROUP BY date( createdAt, 'localtime', 'start of day' ), beerId
  ORDER BY date( createdAt, 'localtime', 'start of day' ) DESC;
  `;

  const pours = await sequelize.query( sql, {
    raw: true,
    type: sequelize.QueryTypes.SELECT
  });


  const flozPouredByBeerIdAndDate = {};
  const dates = [];

  for( const p of pours ){
    if( !flozPouredByBeerIdAndDate[p.beerId] ) flozPouredByBeerIdAndDate[p.beerId] = {}
    flozPouredByBeerIdAndDate[p.beerId][p.date] = utils.flozFromMilliliters( p.millilitersPoured );
    if( dates.indexOf(p.date) === -1 ) dates.push( p.date );
  }

  const beers = await Beer.findAll({
    where: {
      beerId: Object.keys( flozPouredByBeerIdAndDate )
    }
  });

  const beersById = beers.reduce( ( obj, beer ) => {
    obj[beer.beerId] = beer;
    return obj;
  }, {} )

  const datasets = [];
  for( const beerId in flozPouredByBeerIdAndDate ){
    const flozPouredByDate = flozPouredByBeerIdAndDate[beerId];
    const beer = beersById[beerId];

    const flozPouredData = [];
    
    for( const date of dates ){
      const flozPoured = flozPouredByDate[date];
      flozPouredData.push( flozPoured ? flozPoured : 0 )
    }

    datasets.push({
      label: beer.name,
      data: flozPouredData
    });
  }

  res.send({
    poursChart: {
      labels: dates,
      datasets
    }
  })
}
