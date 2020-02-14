const { Pour, Beer, sequelize } = require('../models').models;

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
      result.floz = p.milliliters * 0.033814; // TODO: use a conversion util for this shit
      return result;
    });
  }
  res.send({ pours })
}

async function _getPoursChart( req, res ){
  const sql = `
    SELECT
      date( createdAt, 'start of day' ) as date,
      beerId,
      COUNT(1) as pourCount
    FROM "Pours" WHERE createdAt > date('now','-3 months')
    GROUP BY date( createdAt, 'start of day' ), beerId
    ORDER BY date( createdAt, 'start of day' ) DESC;
  `;

  const pours = await sequelize.query( sql, {
    raw: true,
    type: sequelize.QueryTypes.SELECT
  });


  const poursByBeerId = {}
  const dates = []

  for( const p of pours ){
    if( !poursByBeerId[p.beerId] ) poursByBeerId[p.beerId] = {}
    poursByBeerId[p.beerId][p.date] = p.pourCount

    if( dates.indexOf(p.date) === -1 ) dates.push( p.date )
  }

  const beers = await Beer.findAll({
    where: {
      beerId: Object.keys( poursByBeerId )
    }
  });

  const beersById = beers.reduce( ( obj, beer ) => {
    obj[beer.beerId] = beer
    return obj
  }, {} )

  const datasets = [];
  for( const beerId in poursByBeerId ){
    const pours = poursByBeerId[beerId];
    const beer = beersById[beerId];

    const counts = [];
    
    for( const date of dates ){
      const count = pours[date];
      counts.push( count ? count : 0 )
    }

    datasets.push({
      label: beer.name,
      data: counts,
      backgroundColor: _chartColor( datasets.length )
    });
  }

  res.send({
    poursChart: {
      labels: dates,
      datasets
    }
  })
}

function _chartColor( index){
  const colors = ['#F8B195', '#F67280', '#C06C84', '#6C5B7B', '#355C7D'];
  return colors[index]; 
}
