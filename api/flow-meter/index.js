
const GPIO = require('onoff').Gpio;
const sensor = new GPIO( 23, 'in', 'rising', { activeLow: false } );
const sockets = require('../sockets');

console.log("STARTING", sensor);

// sensor.watch( function(){
// 	console.log( "WATCH", arguments );
// });

// console.log("DONE");

// setInterval( function(){
// 	console.log( "READ", sensor.readSync() );
// }, 500 );

process.on('SIGINT', () => {
	sensor.unexport();
});


exports.listen = function(){
  const FlowMeter = require('./FlowMeter');
  const meter = new FlowMeter( sensor );

  meter.on('pour_start', () => {
    sockets.broadcast({ type: 'pour_start' });
  })

  meter.on('pour_end', () => {
    sockets.broadcast({ type: 'pour_end' });
  })
};
