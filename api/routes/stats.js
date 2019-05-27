const { sequelize } = require('../models').models;

module.exports = function( app ){
  app.get('/api/beers/recent/stats', _getRecentBeerStats );
  app.get('/api/beers/:beerIds/stats', _getBeerStats );
};

async function _getBeerStats( req, res ){
  const beerIds = req.params.beerIds.split(',');
  res.send( await _fetchBeerStats( beerIds ) );
}

async function _getRecentBeerStats( req, res ){
  const recentBeers = await _fetchRecentBeers( 5 );
  if( !recentBeers || !recentBeers.length ) return res.send({ recentBeers: [] });

  const recentBeerIds = recentBeers.map( beer => beer.beerId );
  const recentBeerStats = await _fetchBeerStats( recentBeerIds );
  
  res.send({ recentBeers: recentBeerStats });
}

async function _fetchRecentBeers( count ){
  const sql = `
    SELECT 
      beerId,
      name,
      createdAt
    FROM "Beers"
    ORDER BY createdAt DESC
    LIMIT ?
  `;
  return await sequelize.query( sql, { replacements: [count], type: sequelize.QueryTypes.SELECT });
}

async function _fetchBeerStats( beerIds ){
  const sql = `
    SELECT 
      b.beerId, 
      name, 
      ROUND( SUM(milliliters) ) as milliliters, 
      ROUND( SUM(milliliters) * 0.033814 ) as floz,
      ROUND( SUM(milliliters) * 0.033814 * 0.0078125 ) as gallons,
      COUNT(1) AS "numberOfPours",
      MIN(p."createdAt") as "firstPourDate",
      MAX(p."createdAt") as "lastPourDate",
      CAST( JULIANDAY( MAX(p."createdAt") ) - JULIANDAY( MIN(p."createdAt") ) AS INT ) as "daysOnTap"
    FROM "Beers" b LEFT JOIN "Pours" p ON( b.beerId = p.beerId )
    WHERE b.beerId IN(?)
    GROUP BY b.beerId;
  `;
  const stats = await sequelize.query( sql, { replacements: [beerIds], type: sequelize.QueryTypes.SELECT });
  return stats;
}
