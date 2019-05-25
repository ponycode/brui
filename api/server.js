( async function(){

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

  const PORT = process.env.PORT || 8081;
  const server = app.listen( PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`brui server running on port ${PORT}`)
  });

  require('./sockets').init( server );

  if( argv.flow_meter ){
      const flowMeter = require('./flow-meter')
      flowMeter.listen();
  }

  if( argv.mock_flow_meter ){
    require('./flow-meter/MockFlowMeter');
  }
 
})();
