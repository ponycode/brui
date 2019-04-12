const { Setting, Tap, Beer, Op } = require('../models').models;

module.exports = function( app ){
  app.get('/api/settings', _getSettings );
  app.put('/api/settings', _putSettings );

  app.get('/api/taps/beers', _getBeers );
  app.put('/api/taps/:tapIndex/beer', _putBeer );

  app.get('/api/taps', _getTaps );

};

async function _getSettings( req, res ){
  res.send( await _fetchSettings() );
}

async function _fetchSettings(){
  let settings = await Setting.findAllSettings();
  if( !settings ){
    // Let's always have a settings row no matter what
    settings = await Setting.updateAllSettings({
      numberOfTaps: 0
    });
  }

  const taps = await Tap.findAll();

  settings = settings.toJSON();
  delete settings.id;

  settings.tapNames = [];
  for( const tap of taps ){
    settings.tapNames.push(tap.tapName);
  }
  return settings;
}

async function _putSettings( req, res ){
  let { tapNames, numberOfTaps } = req.body;

  tapNames = tapNames ? tapNames.slice( 0, numberOfTaps ) : null; // safety

  await Setting.updateAllSettings({
    numberOfTaps: numberOfTaps
  });

  const tapIndexes = await _upsertTaps( numberOfTaps, tapNames );
  await _deleteExtraTaps( tapIndexes );

  res.send( await _fetchSettings() );
}

async function _upsertTaps( numberOfTaps, tapNames ){
  const tapIndexes = [];
  for( let i = 0; i < numberOfTaps; i++ ){
    await Tap.upsert({
      tapIndex: i,
      tapName: tapNames && tapNames[i] ? tapNames[i] : `Tap ${i + 1}`
    },
    {
      where: {
        tapIndex: i
      }
    });
    tapIndexes.push( i );
  }
  return tapIndexes;
}

async function _deleteExtraTaps( tapIndexesToKeep ){
  await Tap.destroy({
    where: {
      tapIndex: {
        [Op.notIn]: tapIndexesToKeep
      }
    }
  });
}

async function _getBeers( req, res ){
  res.send({ 
    beers: [
      {
        tapIndex: 0,
        beer: {
          name: 'Cholcolate Hazelnut Porter',
          brewer: {
            name: 'Heretic',
            logoUrl: 'https://thefullpint.com/wp-content/uploads/2013/02/Heretic-Brewing-2013.jpg',
          },
          imageUrl: 'https://untappd.akamaized.net/site/beer_logos_hd/beer-447033_aac23_hd.jpeg',
          abv: 7.00,
          ibu: 43,
          description: 'Chocolate Hazelnut Porter, or CHP as we call it, is a dessert in a glass. It is a rich, robust porter bursting with luscious chocolate and hazelnut. Notes of coffee and caramel round out this delicious treat.'
        }
      },
      {
        tapIndex: 1,
        name: 'Center Tap',
        beer: null
      },
      {
        tapIndex: 2,
        beer: {
          name: 'Prohibition Ale',
          brewer: {
            name: 'Speakeasy',
            logoUrl: 'https://static1.squarespace.com/static/51af3347e4b0b9ab836de9cd/t/55ca5c74e4b0bc107d12c251/1439325302004/',
          },
          imageUrl: 'https://brewerydb-images.s3.amazonaws.com/beer/a1mQAQ/upload_y6Zupc-large.png',
          abv: 6.1,
          ibu: 50,
          description: 'Prohibition Ale is the first beer we bootlegged back in the early days of the brewery. Anything but traditional, Prohibition pours a deep reddish amber hue, with a fluffy tan head that leaves a beautiful lacing on the glass. A lush, complex aroma teases the senses with juicy grapefruit, citrus, pine, spice and candied caramel malts. Mouth-feel is creamy, with a silky, medium body and modest carbonation.'
        }
      }
    ]
  });
}

async function _putBeer( req, res ){
  res.send({ beer: req.body.tap });
}

async function _getTaps( req, res ){
  const taps = await Tap.findAll({
    include: [Beer]
  })

  const results = [];
  for( let tap of taps ){
    tap = tap.toJSON();
    const { Beer: beer } = tap

    delete tap.Beer;

    results.push({
      ...tap,
      beer
    });
  }

  res.send( results )
}
