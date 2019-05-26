
const sockets = require('../sockets');
const { Pour, Tap } = require('../models').models;
const FlowMeter = require('./FlowMeter');

const flowMeters = [];
const ML_PER_TICK = 0.64; // TODO: add to settings UI

exports.listen = function(){
  const tapConfig = [
    {
      tapIndex: 0,
      gpioPin: 24
    },
    // No middle tap right now
    {
      tapIndex: 2,
      gpioPin: 23
    }
  ];

  tapConfig.forEach( ({ tapIndex, gpioPin }) => {
    const flowMeter = new FlowMeter( FlowMeter.createGPIO( gpioPin ) );
    flowMeter.on('pour_start', exports.pourStart.bind( null, tapIndex ) );
    flowMeter.on('pour_status', exports.pourStatus.bind( null, tapIndex ) ); 
    flowMeter.on('pour_end', exports.pourEnd.bind( null, tapIndex ) );
    flowMeters.push( flowMeter );
  });
};

exports.pourStart = async function( tapIndex ){
  const tap = await Tap.findByTapIndexWithBeer( tapIndex );
  const beerName = tap && tap.Beer ? tap.Beer.name : ''
  sockets.broadcast({ type: 'pour_start', tapIndex, beerName });
}

exports.pourStatus = async function( tapIndex, { durationSeconds, pourTickCount } ){
  const milliliters = pourTickCount * ML_PER_TICK;
  sockets.broadcast({ type: 'pour_status', tapIndex, durationSeconds, pourTickCount, milliliters });
}

exports.pourEnd = async function( tapIndex, { durationSeconds, pourTickCount } ){
  const milliliters = pourTickCount * ML_PER_TICK;
  console.log( "Pour ended", tapIndex, pourTickCount, milliliters, durationSeconds );

  const tap = await Tap.findById( tapIndex );

  const pour = await Pour.create({
    beerId: tap ? tap.beerId : null,
    tapIndex,
    tickCount: pourTickCount,
    durationSeconds: durationSeconds,
    milliliters
  })
  console.log( "Saved a pour record", pour.pourId );

  setTimeout( () => {
    // have modal linger a bit
    sockets.broadcast({ type: 'pour_end', tapIndex, durationSeconds, milliliters });
  }, 2000 );
};
