const assert = require('chai').assert;
const dbUtils = require('./lib/dbUtils');

describe('Tap Model', function(){

  beforeEach( dbUtils.emptyDB );

  it( 'taps and kegs are happy together', async function(){
    const { Tap, Keg, Beer } = require('../../api/models').models;

    const beer = await Beer.create({
      name: "Unholy Swill"
    });

    const keg = await Keg.create({
      beerId: beer.beerId,
      gallons: 5
    });

    const tap = await Tap.create({
      tapIndex: 0,
      tapName: 'Left Tap',
      kegId: keg.kegId
    });

    const dbTap = await Tap.findByTapIndexWithBeer( tap.tapIndex );
    assert.ok( dbTap );

    const dbBeer = dbTap.Beer;
    assert.ok( dbBeer );
    assert.equal( dbBeer.name, beer.name );
  });

});
