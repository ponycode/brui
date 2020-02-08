const path = require('path');

module.exports = function( app ){
  require('./pours')( app );
  require('./settings')( app );
  require('./stats')( app );
  require('./beers')( app );

  app.get('/', _serveVueApp );
  app.get('/*', _serveVueApp );

  function _serveVueApp( req, res ){
    res.sendFile( path.resolve( __dirname, '../../dist/index.html') );
  }

};
