const { Pour, Beer } = require('../models').models;

module.exports = function( app ){
  app.get('/api/pours', _getPours );
};

async function _getPours( req, res ){
  let pours = await Pour.findAll({
    where: {
      createdAt: {
        $gt: new Date( new Date().getTime() - 30 * 24 * 60 * 60 * 1000 )
      }
    },
    order: [['createdAt', 'DESC']],
    limit: 1000,
    include: [Beer]
  })
  if( pours.length > 0 ) pours = pours.map( p => {
    const result = p.toJSON();
    result.beerName = p.Beer.name;
    result.floz = p.milliliters * 0.033814;
    return result;
  });
  res.send({ pours })
}
