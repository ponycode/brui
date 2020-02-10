const assert = require('chai').assert;
const dbUtils = require('../lib/dbUtils');
const axios = require('axios').create({
  baseURL: 'http://localhost:8081'
});

describe('Tap Model', function(){

  beforeEach( dbUtils.emptyDB );

  it( 'can put a keg onto a tap and take it off', async function(){
    const { Tap, Beer, Keg } = require('../../../api/models').models;

    const tap = await Tap.create({
      tapIndex: 0,
      tapName: 'Left Tap'
    });

    const beer = await Beer.create({
      name: "Unholy Swill"
    });

    const { data: { tap: dbTap } } = await axios.put(`/api/taps/${tap.tapIndex}/keg`, { beerId: beer.beerId, gallons: 10 });

    const { Keg: dbKeg } = dbTap;
    const { Beer: dbBeer } = dbKeg;

    assert.ok( dbKeg.kegId );
    assert.equal( dbBeer.beerId, beer.beerId );

    await _simulatePours( dbTap.tapIndex, dbKeg );

    const { data: { tap: dbTapAfterDelete } } = await axios.delete(`/api/taps/${tap.tapIndex}/keg`);
    assert.ok( dbTapAfterDelete );
    assert.notOk( dbTapAfterDelete.Keg );

    const keg = await Keg.findByPk( dbKeg.kegId );
    assert.ok( keg.finishedAt );
    assert.equal( keg.gallons, 10 );
    assert.equal( keg.totalPourCount, 3 );
    assert.equal( keg.totalPourMilliliters, 1800 );
  });

  async function _simulatePours( tapIndex, keg ){
    const { Pour } = require('../../../api/models').models;

    for( let i = 0; i < 3; i++ ){
      await Pour.create({
        kegId: keg.kegId,
        beerId: keg.beerId,
        tapIndex: tapIndex,
        durationSeconds: i + 2,
        tickCount: i * 15,
        milliliters: i * 600
      });
    }
  }

  it( 'can fetch /taps with Keg and Beer info', async function(){
    const { Tap, Keg, Beer } = require('../../../api/models').models;

    const beer = await Beer.create({
      name: "Unholy Swill"
    });

    const keg = await Keg.create({
      beerId: beer.beerId
    });

    const tap = await Tap.create({
      tapIndex: 0,
      tapName: 'Left Tap',
      kegId: keg.kegId
    });

    const { data: { taps } } = await axios.get('/api/taps');
    assert.lengthOf( taps, 1 );

    const [dbTap] = taps;
    const { Keg: dbKeg } = dbTap;
    const { Beer: dbBeer } = dbKeg

    assert.equal( dbTap.tapIndex, tap.tapIndex );
    assert.equal( dbKeg.kegId, keg.kegId );
    assert.equal( dbBeer.beerId, beer.beerId );
  });

});
