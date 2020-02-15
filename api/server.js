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


    if( argv.flow_meter ){
      // eslint-disable-next-line no-console
      console.log('FLOW METER ENABLED');

      /**
       * This is a live flow meter which relies on pigpio to recieve tick events from the
       * hall-effect sensor. It calls events on the pour listener who handles the DB interactions
       * and notifies the client UI via sockets.
       */
      const pourListener = new PourListener();
      const flowMeter = require('./flow-meter')
      flowMeter.listen( pourListener );
    }else if( argv.simulated_flow_meter ){
      // eslint-disable-next-line no-console
      console.log('SIMULATED POURS ENABLED');
      /**
       * A little bit circular here but here's how it works.
       * 
       * The pourListener handles DB interactions and send socket messages to the client to show
       * and hide the pouring modal.
       * 
       * Since the simulatedFlowMeter is triggered by the client, it becaomse a messageListener so that
       * it can recieve pourStart and pourEnd events. It then simulates a pour as if it came from the
       * FlowMeter and notifies the pourListener who notifies the client.
       * 
       * To see this in action set the argument above and then press and hold 1, 2, or 3 on the client UI. The number
       * corresponds to the tap index 1=0, 2=1, 3=2. Release the button to end the pour.
       */
      const SimulatedFlowMeter = require('./flow-meter/SimulatedFlowMeter');
      const pourListener = new PourListener();
      const simulatedFlowMeter = new SimulatedFlowMeter( pourListener );
      sockets.addMessageListener( simulatedFlowMeter.onSocketMessage.bind(simulatedFlowMeter) );
    }

  });

})();
