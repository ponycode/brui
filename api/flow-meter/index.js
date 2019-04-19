
const sockets = require('../sockets');
const { Pour } = require('../models').models;
const FlowMeter = require('./FlowMeter');

const flowMeters = [];

exports.listen = function(){
  const gpioPin = 23;
  const tapIndex = 3;// TODO: stop hardcoding these tapIndex - use config

  const flowMeter = new FlowMeter( FlowMeter.gpioPin( gpioPin ) );
  flowMeter.on('pour_start', exports.pourStart.bind( null, tapIndex ) ); 
  flowMeter.on('pour_end', exports.pourEnd.bind( null, tapIndex ) );
  flowMeters.push( flowMeter );
};

exports.pourStart = async function( tapIndex ){
  sockets.broadcast({ type: 'pour_start', tapIndex });
}

exports.pourEnd = async function( tapIndex, { durationSeconds, pourTickCount } ){
  console.log( "Pour ended", tapIndex, durationSeconds, pourTickCount );
  sockets.broadcast({ type: 'pour_end', tapIndex, durationSeconds, pourTickCount });

  const pour = await Pour.create({
    beerId: 0,
    tapIndex,
    tickCount: pourTickCount,
    durationSeconds: durationSeconds
  })

  console.log( "Saved a pour record", pour.pourId );
};
