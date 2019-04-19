
const sockets = require('../sockets');
const { Pour, Tap } = require('../models').models;
const FlowMeter = require('./FlowMeter');

const flowMeters = [];
const ML_PER_TICK = 0.64; // TODO: add to settings UI

exports.listen = function(){
  const gpioPin = 23;
  const tapIndex = 3;// TODO: stop hardcoding these tapIndex - use config

  const flowMeter = new FlowMeter( FlowMeter.createGPIO( gpioPin ) );
  flowMeter.on('pour_start', exports.pourStart.bind( null, tapIndex ) );
  flowMeter.on('pour_status', exports.pourStart.bind( null, tapIndex ) ); 
  flowMeter.on('pour_end', exports.pourEnd.bind( null, tapIndex ) );
  flowMeters.push( flowMeter );
};

exports.pourStart = async function( tapIndex ){
  const tap = await Tap.findByTapIndexWithBeer( tapIndex );
  let beerName = tap.Beer ? tap.Beer.beerName : ''
  sockets.broadcast({ type: 'pour_start', tapIndex, beerName });
}

exports.pourStatus = async function( { durationSeconds, pourTickCount } ){
  const milliliters = pourTickCount * ML_PER_TICK;
  sockets.broadcast({ type: 'pour_status', durationSeconds, pourTickCount, milliliters });
}

exports.pourEnd = async function( tapIndex, { durationSeconds, pourTickCount } ){
  const milliliters = pourTickCount * ML_PER_TICK;

  console.log( "Pour ended", tapIndex, pourTickCount, milliliters, durationSeconds );
  sockets.broadcast({ type: 'pour_end', tapIndex, durationSeconds, milliliters });

  const tap = await Tap.findById( tapIndex );

  const pour = await Pour.create({
    beerId: tap ? tap.beerId : null,
    tapIndex,
    tickCount: pourTickCount,
    durationSeconds: durationSeconds,
    milliliters
  })

  console.log( "Saved a pour record", pour.pourId );
};
