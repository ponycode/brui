const { Pour } = require('../models').models;

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
    limit: 1000
  })
  if( pours.length > 0 ) pours = pours.map( p => p.toJSON() );
  res.send({ pours })
}
