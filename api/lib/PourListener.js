const WakeUp = require('./Wakeup');
const socketMessages = require('./socketMessages');
const socketActions = require('./socketActions');

class PourListener {

  constructor({ millilitersPerTick = 0.64 } = {}){
    this.millilitersPerTick = millilitersPerTick;
  }

  async pourStart( tapIndex ){    
    const { Tap } = require('../models').models;

    const tap = await Tap.findByTapIndexWithBeer( tapIndex );
    const beerName = tap.Beer ? tap.Beer.name : '';

    socketMessages.sendPourStart( tapIndex, beerName );

    WakeUp.loudNoise();
  }

  async pourStatus( tapIndex, { durationSeconds, pourTickCount }){
    const milliliters = pourTickCount * this.millilitersPerTick;
    socketMessages.sendPourStatus({ tapIndex, durationSeconds, pourTickCount, milliliters });
  }

  async pourEnd( tapIndex, { durationSeconds, pourTickCount, simulated = false }){
    const { Tap, Pour } = require('../models').models;

    const milliliters = Math.round( pourTickCount * this.millilitersPerTick );
    console.log( `Pour ended [${tapIndex}]: ${pourTickCount} ticks; ${milliliters} ml.; ${durationSeconds} seconds`);

    const tap = await Tap.findByTapIndexWithBeer( tapIndex );
    if( !tap.Keg || !tap.Beer ){
      socketMessages.sendPourEnd({ tapIndex, durationSeconds, milliliters, pourTickCount, pourId: null });
      return;
    }

    const pour = await Pour.create({
      tapIndex,
      kegId: tap.kegId,
      beerId: tap.Beer.beerId,
      tickCount: pourTickCount,
      durationSeconds: durationSeconds,
      milliliters,
      simulated
    })
    console.log( "Saved a pour record", pour.pourId );

    socketMessages.sendPourEnd({ tapIndex, durationSeconds, milliliters, pourTickCount, pourId: pour.pourId });
    socketActions.sendKegStatuses();
  }

}

module.exports = PourListener;
