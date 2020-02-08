const { Beer } = require('../models').models;

module.exports = function( app ){
  app.get('/api/beers/recent', _getMostRecentBeers );
};

async function _getMostRecentBeers( req, res ){
  const beers = await Beer.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20
  })
  res.send({ beers })
}
