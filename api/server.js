( async function(){

  const argv = require('minimist')(process.argv.slice(2));
  const PourListener = require('./lib/PourListener');
  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser')
  const socketListener = require('./lib/socketListener');
  await require('./sequelize').connect( argv.environment );
  const fileUpload = require('express-fileupload');
  
  const app = express();
  
  app.use( express.static( path.join( __dirname, '/public' ) ) );
  app.use( express.static( path.join( __dirname, '../dist' ), { index: false } ) );
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded({ extended: true }) );
  app.use( fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
  require('./routes')( app );

  app.use( function( err, req, res ){
    // eslint-disable-next-line no-console
    console.error('SERVER ERROR:', err.stack);
    res.status(500).send('Something broke!');
  })

  const PORT = process.env.PORT || 8081;


  const server = app.listen( PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`brui server running on port ${PORT}`);
  });

  const sockets = require('./sockets');
  sockets.init( server );
  sockets.addMessageListener( socketListener.onSocketMessage.bind(socketListener) );

  // TODO: make this DB driven
  const pinConfig = [
    {
      type: 'flow',
      tapIndex: 0,
      gpioPin: 24,
    },
    {
      type: 'flow',
      tapIndex: 2,
      gpioPin: 23,
    },
    {
      type: 'temp-humidity',
      gpioPin: 25,
      readIntervalSeconds: 3
    }
  ];

  if( argv.flow_meter ){
    // eslint-disable-next-line no-console
    console.log('FLOW METER ENABLED');
    const flowMeter = require('./flow-meter')
    flowMeter.listen({ pinConfig, pourListener: new PourListener() });
  }

  if( argv.temp_humidity_sensor ){
    // eslint-disable-next-line no-console
    console.log('TEMP & HUMIDITY SENSOR ENABLED');
    const tempHumiditySensor = require('./temp-humidity-sensor');
    tempHumiditySensor.listen({ pinConfig, sockets });
  }

})();
