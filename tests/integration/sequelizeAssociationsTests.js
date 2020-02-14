const assert = require('chai').assert;
const dbUtils = require('./lib/dbUtils');

describe('Data model works as expected', function(){

  beforeEach( dbUtils.emptyDB );

  it( 'pours and beers are happy together', async function(){
    const { Pour } = require('../../api/models').models;

    const [tap] = await dbUtils.insertTaps();
    const [beer] = await dbUtils.insertBeers();
    await dbUtils.addAKeg( tap, beer );
    const [pour] = await dbUtils.generatePours( tap, { pourCount: 1, firstPourDaysAgo: 1 });

    const pours = await Pour.findAllWithBeer();
    assert.lengthOf( pours, 1 );
    assert.equal( pours[0].pourId, pour.pourId );
    assert.equal( pours[0].Beer.beerId, beer.beerId );
  });

  it( 'taps and kegs are happy together', async function(){
    const { Tap, Keg, Beer } = require('../../api/models').models;

    const beer1 = await Beer.create({
      name: "Unholy Swill"
    });

    const keg1 = await Keg.create({
      beerId: beer1.beerId,
      gallons: 5
    });

    const leftTap = await Tap.create({
      tapIndex: 0,
      tapName: 'Left Tap',
      kegId: keg1.kegId
    });

    const dbKeg = await leftTap.getKeg();
    assert.equal( dbKeg.kegId, keg1.kegId );

    const dbTap = await keg1.getTap();
    assert.equal( dbTap.tapIndex, leftTap.tapIndex );
  });

  it( 'kegs and beers are happy together', async function(){
    const { Keg, Beer } = require('../../api/models').models;

    const beer1 = await Beer.create({
      name: "Unholy Swill"
    });

    const keg1 = await Keg.create({
      beerId: beer1.beerId,
      gallons: 5
    });

    const dbBeer = await keg1.getBeer();
    assert.equal( dbBeer.beerId, beer1.beerId );

    const dbKegs = await beer1.getKegs();
    assert.lengthOf( dbKegs, 1 );
  });

  it( 'kegs and pours are happy together', async function(){
    const { Tap, Keg, Beer, Pour } = require('../../api/models').models;

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

    for( let i = 0; i < 3; i++ ){
      await Pour.create({
        kegId: keg.kegId,
        beerId: beer.beerId,
        tapIndex: tap.tapIndex,
        durationSeconds: i + 2,
        tickCount: i * 15,
        milliliters: i * 600
      });
    }

    const pours = await keg.getPours();
    assert.lengthOf( pours, 3 );
    for( const p of pours ){
      assert.equal( p.beerId, beer.beerId );
      assert.equal( p.tapIndex, tap.tapIndex );
    }
  });

  it('taps, kegs, and beers are happy together', async function(){
    const { Keg, Beer, Tap } = require('../../api/models').models;
    const { leftTap, beer1, keg1 } = await _createPopulatedDoubleTap();

    const dbTap = await Tap.findByPk( leftTap.tapIndex , {
      include: [
        {
          model: Keg,
          include: [
            {
              model: Beer
            }
          ]
        }
      ]
    });

    const { Keg: dbKeg } = dbTap;
    const { Beer: dbBeer } = dbKeg;

    assert.equal( dbKeg.kegId, keg1.beerId );
    assert.equal( dbBeer.beerId, beer1.beerId );

    const pours = await dbKeg.getPours();
    assert.lengthOf( pours, 3 );
    for( const p of pours ){
      assert.equal( p.beerId, beer1.beerId );
      assert.equal( p.tapIndex, leftTap.tapIndex );
    }
  
  });

  async function _createPopulatedDoubleTap(){
    const { Beer, Tap, Keg, Pour } = require('../../api/models').models;

    const beer1 = await Beer.create({
      name: "Unholy Swill"
    });

    const beer2 = await Beer.create({
      name: "Delish IPA"
    });

    const keg1 = await Keg.create({
      beerId: beer1.beerId,
      gallons: 5
    });

    const leftTap = await Tap.create({
      tapIndex: 0,
      tapName: 'Left Tap',
      kegId: keg1.kegId
    });

    const rightTap = await Tap.create({
      tapIndex: 1,
      tapName: 'Right Tap'
    });

    const pours = [];
    for( let i = 0; i < 3; i++ ){
      const pour = await Pour.create({
        kegId: keg1.kegId,
        beerId: beer1.beerId,
        tapIndex: leftTap.tapIndex,
        durationSeconds: i + 2,
        tickCount: i * 15,
        milliliters: i * 600
      });
      pours.push( pour );
    }

    return {
      leftTap,
      rightTap,
      beer1,
      beer2,
      keg1,
      pours
    };
  }

});
