( async function(){

  const PourListener = require('./lib/PourListener');
  const argv = require('minimist')(process.argv.slice(2));
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser')
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

    const pourListener = new PourListener();

    if( argv.flow_meter ){
        const flowMeter = require('./flow-meter')
        flowMeter.listen( pourListener );
    }else if( argv.simulated_flow_meter ){
      const SimulatedFlowMeter = require('./flow-meter/SimulatedFlowMeter');
      const simulatedFlowMeter = new SimulatedFlowMeter( pourListener );
      sockets.addMessageListener( simulatedFlowMeter.onSocketMessage.bind(simulatedFlowMeter) );
    }

  });

})();
