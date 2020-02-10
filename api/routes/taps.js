const { Tap, Keg, transaction } = require('../models').models;
const _ = require('lodash');
const sockets = require('../sockets');

module.exports = function( app ){
  app.get('/api/taps', _getTaps );
  app.put('/api/taps/:tapIndex/keg', _putKegOntoTap );
  app.delete('/api/taps/:tapIndex/keg', _deleteKegFromTap );
};

async function _getKegPourSummary( keg, transaction ){
  const pours = await keg.getPours({ transaction });

  let totalPourCount = 0;
  let totalPourMilliliters = 0;

  for( const pour of pours ){
    totalPourCount++;
    totalPourMilliliters += pour.milliliters;
  }

  return {
    totalPourCount,
    totalPourMilliliters
  };
}

async function _deleteKegFromTap( req, res ){
  let { tapIndex } = req.params;
  tapIndex = parseInt( tapIndex, 10 );

  await transaction( async transaction => {
    const tap = await Tap.findByTapIndexWithBeer( tapIndex, transaction );
    const keg = tap.Keg;

    if( keg ){
      const pourSummary = await _getKegPourSummary( keg, transaction );
      keg.finishedAt = new Date(); // TODO: GMT?
      keg.totalPourCount = pourSummary.totalPourCount;
      keg.totalPourMilliliters = pourSummary.totalPourMilliliters;
      await keg.save({ transaction });
    }

    await Tap.update({
      kegId: null
    },
    {
      where: {
        tapIndex 
      },
      omitNull: true,
      transaction
    });
    
  });

  sockets.broadcast({ type: 'reload_taps' });

  const updatedTap = await Tap.findByTapIndexWithBeer( tapIndex );

  res.send({ tap: updatedTap });
}

async function _putKegOntoTap( req, res ){
  let { beerId, gallons } = req.body;
  let { tapIndex } = req.params;

  beerId = parseInt( beerId, 10 );
  tapIndex = parseInt( tapIndex, 10 );
  gallons = parseInt( gallons, 10 );

  if( !_.isNumber(beerId) ) return res.status(400).send('beerId is required');
  if( !_.isNumber(tapIndex) ) return res.status(400).send('tapIndex is required');
  if( !_.isNumber(gallons) ) return res.status(400).send('gallons is required');

  await transaction( async transaction => {
    const keg = await Keg.create({
      beerId,
      gallons
    }, { transaction });
  
    await Tap.update({
      kegId: keg.kegId
    },
    {
      where: {
        tapIndex 
      },
      transaction
    });
  });

  const tap = await Tap.findByTapIndexWithBeer( tapIndex );

  sockets.broadcast({ type: 'reload_taps' });

  res.send({ tap });
}

async function _getTaps( req, res ){
  const taps = await Tap.findAllWithBeers();
 
  const results = [];
  for( let tap of taps ){
    const tapJson = tap.toJSON();
    delete tapJson.Beer;
    results.push( tapJson );
  }

  res.send({ taps: results })
}
