const { Setting } = require('../models').models;

module.exports = function( app ){
  app.get('/api/settings', _getSettings );
  app.put('/api/settings', _putSettings );
};

async function _getSettings( req, res ){
  let settings = await Setting.findAllSettings();
  if( !settings ){
    // Let's always have a settings row no matter what
    settings = await Setting.updateAllSettings({
      numberOfTaps: 1,
      tapNames: ['Tap 1']
    });
  }

  settings = settings.toJSON();
  delete settings.id;

  res.send( settings );
}

async function _putSettings( req, res ){
  const settings = req.body;

  await Setting.updateAllSettings({
    numberOfTaps: settings.numberOfTaps,
    tapNames: settings.tapNames
  });

  const updatedSettings = await Setting.findAllSettings();
  res.send( updatedSettings );
}
