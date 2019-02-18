const { Setting } = require('../models').models;

module.exports = function( app ){
  app.put('/api/settings',  _putSettings );
};

async function _putSettings( req, res ){
  const settings = req.body;

  const r = await Setting.upsert({ numberOfTaps: settings.numberOfTaps });
  res.status( 200 );
  res.send({
    taps: [
      {
        fuck: 'yea'
      }
    ]
  })
}
