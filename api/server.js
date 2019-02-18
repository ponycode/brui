( async function(){

  const express = require('express');
  const path = require('path');
  const bodyParser = require('body-parser')
  await require('./database').connect();
  
  const app = express();
  
  app.use( express.static( path.join( __dirname, '/public' ) ) );
  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded({ extended: true }) );
  
  require('./routes/settings')( app );
  
  const PORT = process.env.PORT || 8081;
  app.listen( PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`brui server running on port ${PORT}`)
  });

})();
