const flowMeter = require('./index')

setInterval( () => {
  flowMeter.pourStart(2);

  setTimeout( () => {
    flowMeter.pourStatus(2, { durationSeconds: .2, pourTickCount: 30, milliliters: 100 });
  }, 500 );

  setTimeout( () => {
    flowMeter.pourStatus(2, { durationSeconds: .3, pourTickCount: 60, milliliters: 200 });
  }, 1000 );

  setTimeout( () => {
    flowMeter.pourStatus(2, { durationSeconds: .4, pourTickCount: 80, milliliters: 300 });
  }, 1500 );

  setTimeout( () => {
    flowMeter.pourStatus(2, { durationSeconds: .4, pourTickCount: 100, milliliters: 400 });
  }, 2000 );

  setTimeout( () => {
    flowMeter.pourEnd(2, { durationSeconds: .6, pourTickCount: 101, milliliters: 500 });
  }, 2500 );

}, 6000 );
