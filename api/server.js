const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
require('./database');

const app = express();

app.get('/api/taps', ( req, res ) => {
  res.status( 200 );
  res.send({
    taps: [
      {
        fuck: 'yea'
      }
    ]
  })
});

app.use( express.static( path.join( __dirname, '/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

const PORT = process.env.PORT || 8081;
app.listen( PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`brui server running on port ${PORT}`)
});
