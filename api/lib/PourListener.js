const sockets = require('../sockets');
const WakeUp = require('./Wakeup');

class PourListener {

  constructor({ millilitersPerTick = 0.64 } = {}){
    this.sockets = sockets;
    this.millilitersPerTick = millilitersPerTick;
  }

  async pourStart( tapIndex ){    
    const { Tap } = require('../models').models;

    const tap = await Tap.findByTapIndexWithBeer( tapIndex );
    const beerName = tap.Beer ? tap.Beer.name : '';

    sockets.broadcast({ type: 'pour_start', tapIndex, beerName });

    WakeUp.loudNoise();
  }

  async pourStatus( tapIndex, { durationSeconds, pourTickCount }){
    const milliliters = pourTickCount * this.millilitersPerTick;
    sockets.broadcast({ type: 'pour_status', tapIndex, durationSeconds, pourTickCount, milliliters });
  }

  async pourEnd( tapIndex, { durationSeconds, pourTickCount }){
    const { Tap, Pour } = require('../models').models;

    const milliliters = Math.round( pourTickCount * this.millilitersPerTick );
    console.log( "Pour ended", tapIndex, pourTickCount, milliliters, durationSeconds );

    const tap = await Tap.findByTapIndexWithBeer( tapIndex );

    const pour = await Pour.create({
      tapIndex,
      kegId: tap.kegId,
      beerId: tap.Beer.beerId,
      tickCount: pourTickCount,
      durationSeconds: durationSeconds,
      milliliters
    })
    console.log( "Saved a pour record", pour.pourId );

    sockets.broadcast({ type: 'pour_end', tapIndex, durationSeconds, milliliters, pourId: pour.pourId });
  }

}

module.exports = PourListener;
