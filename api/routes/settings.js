const { Setting, Tap, Op, sequelize } = require('../models').models;

module.exports = function( app ){
  app.get('/api/settings', _getSettings );
  app.put('/api/settings', _putSettings );
};

async function _getSettings( req, res ){
  res.send( await _fetchSettings() );
}

/**
 * This retrieves the single settings row for basic settings. It also loads
 * all the Taps from the DB. I'm storing the names on the Taps in the DB - not 
 * the settings row.
 */
async function _fetchSettings(){
  let settings = await Setting.findAllSettings();
  if( !settings ){
    // Let's always have a settings row no matter what
    settings = await Setting.updateAllSettings({
      numberOfTaps: 0
    });
  }

  settings.numberOfTaps = parseInt( settings.numberOfTaps, 10 );
  
  const taps = await Tap.findAll();

  settings = settings.toJSON();
  delete settings.id;

  settings.tapNames = [];
  for( const tap of taps ){
    settings.tapNames.push(tap.tapName);
  }
  return settings;
}

/**
 * If the user modifies the number of taps we do the following:
 * 
 * - Change the number in the single settings row
 * - Upsert the correct number of Taps with names
 * - Delete any leftover taps ( when the user decreases the number of taps )
 * 
 * This route then re-fetches and returns all settings and tapNames
 * 
 * @param {*} req 
 * @param {*} res 
 */
async function _putSettings( req, res ){
  let { tapNames, numberOfTaps } = req.body;

  tapNames = tapNames ? tapNames.slice( 0, numberOfTaps ) : null; // safety

  await sequelize.transaction( async transaction => {
    await Setting.updateAllSettings({
      numberOfTaps: numberOfTaps
    }, transaction );

    const tapIndexes = await _upsertTaps( numberOfTaps, tapNames, transaction );
    await _deleteExtraTaps( tapIndexes, transaction );
  });
 

  

  res.send( await _fetchSettings() );
}

async function _upsertTaps( numberOfTaps, tapNames, transaction ){
  const tapIndexes = [];
  for( let i = 0; i < numberOfTaps; i++ ){
    await Tap.upsert({
      tapIndex: i,
      tapName: tapNames && tapNames[i] ? tapNames[i] : `Tap ${i + 1}`
    },
    {
      where: {
        tapIndex: i
      },
      transaction
    });
    tapIndexes.push( i );
  }
  return tapIndexes;
}

async function _deleteExtraTaps( tapIndexesToKeep, transaction ){
  await Tap.destroy({
    where: {
      tapIndex: {
        [Op.notIn]: tapIndexesToKeep
      }
    },
    transaction
  });
}
