
const GPIO = require('onoff').Gpio;
const sockets = require('../sockets');
const { Pour } = require('../models').models;


exports.listen = function(){
  const FlowMeter = require('./FlowMeter');

  const rightTapSensor = new GPIO( 23, 'in', 'rising', { activeLow: false } );
  const rightTapFlowMeter = new FlowMeter( rightTapSensor );

  process.on('SIGINT', () => {
    rightTapSensor.unexport();
  });

  rightTapFlowMeter.on('pour_start', () => {
    exports.pourStart( 3 ); // TODO: stop hardcoding these tapIndexes
  })

  rightTapFlowMeter.on('pour_end', (data) => {
    exports.pourEnd( 3, data );
  })
};

exports.pourStart = async function( tapIndex ){
  sockets.broadcast({ type: 'pour_start', tapIndex });
}

exports.pourEnd = async function( tapIndex, { diffHrTime, pourTickCount } ){
  sockets.broadcast({ type: 'pour_end', tapIndex, diffHrTime, pourTickCount });

  const pour = await Pour.create({
    beerId: 0,
    tapIndex,
    tickCount: pourTickCount,
    durationSeconds: diffHrTime / 1e6
  })

  console.log( "Saved a pour", pour.pourId );
};
