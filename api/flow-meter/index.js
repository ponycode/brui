
const GPIO = require('onoff').Gpio;
const sensor = new GPIO( 23, 'in', 'rising', { activeLow: false } );

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
  new FlowMeter( sensor );
};
