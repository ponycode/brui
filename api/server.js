( async function(){

  const PourListener = require('./lib/PourListener');
  const argv = require('minimist')(process.argv.slice(2));
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser')
  const socketListener = require('./lib/socketListener');
  await require('./database').connect( argv.database );
  
  const app = express();
  
  app.use( express.static( path.join( __dirname, '/public' ) ) );
  app.use( express.static( path.join( __dirname, '../dist' ), { index: false } ) );
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded({ extended: true }) );
  
  require('./routes')( app );

  app.use( function( err, req, res, next ){
    console.error('SERVER ERROR:', err.stack);
    res.status(500).send('Something broke!');
  })

  const PORT = process.env.PORT || 8081;

  return new Promise( ( resolve ) => {

    const server = app.listen( PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`brui server running on port ${PORT}`);
      resolve();
    });
  
    const sockets = require('./sockets');
    sockets.init( server );
    sockets.addMessageListener( socketListener.onSocketMessage.bind(socketListener) );

    if( argv.flow_meter ){
      // eslint-disable-next-line no-console
      console.log('FLOW METER ENABLED');
      const flowMeter = require('./flow-meter')
      flowMeter.listen( new PourListener() );
    }
   
  });

})();
