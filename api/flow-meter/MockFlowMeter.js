const flowMeter = require('./index')

run( 2 );

async function waitMs( ms ){
  return new Promise( resolve => {
    setTimeout( resolve, ms );
  });
}

async function run( tapIndex ){
  flowMeter.pourStart( tapIndex );
  await waitMs( 1000 );
  flowMeter.pourStatus( tapIndex, { durationSeconds: .2, pourTickCount: 30, milliliters: 100 });
  await waitMs( 1000 );
  flowMeter.pourStatus( tapIndex, { durationSeconds: .3, pourTickCount: 60, milliliters: 200 });
  await waitMs( 1000 );
  flowMeter.pourStatus( tapIndex, { durationSeconds: .4, pourTickCount: 80, milliliters: 300 });
  await waitMs( 1000 );
  flowMeter.pourStatus( tapIndex, { durationSeconds: .5, pourTickCount: 100, milliliters: 400 });
  await waitMs( 1000 );
  flowMeter.pourStatus( tapIndex, { durationSeconds: .6, pourTickCount: 120, milliliters: 500 });
  await waitMs( 1000 );
  flowMeter.pourEnd( tapIndex, { durationSeconds: .7, pourTickCount: 150, milliliters: 600 });

  setTimeout( run.bind( null, tapIndex ), 6000 )
}
