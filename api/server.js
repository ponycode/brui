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

  /* DEBUGGING CODE
  const flowMeter = require('./flow-meter')
  setInterval( () => {
    flowMeter.pourStart(2);

    setTimeout( () => {
      flowMeter.pourStatus(2, { durationSeconds: .2, pourTickCount: 30, milliliters: 100 });
    }, 500 );

    setTimeout( () => {
      flowMeter.pourStatus(2, { durationSeconds: .3, pourTickCount: 60, milliliters: 200 });
    }, 1000 );

    setTimeout( () => {
      flowMeter.pourStatus(2, { durationSeconds: .4, pourTickCount: 80, milliliters: 300 });
    }, 1500 );

    setTimeout( () => {
      flowMeter.pourStatus(2, { durationSeconds: .4, pourTickCount: 100, milliliters: 400 });
    }, 2000 );

    setTimeout( () => {
      flowMeter.pourEnd(2, { durationSeconds: .6, pourTickCount: 101, milliliters: 500 });
    }, 2500 );

  }, 6000 );
  */
 
})();
