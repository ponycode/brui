const moment = require('moment');

const ML_PER_TICK = 0.64; 
const ML_PER_FLOZ = 29.5735;
const SECONDS_PER_FLOZ = 0.65;
const MAX_POUR_FLOZ = 16;
const MIN_POUR_FLOZ = 6;

exports.emptyDB = async function(){
  const { Beer, Tap, Keg, Pour } = require('../../../api/models').models;
  await Pour.destroy({ truncate: true });
  await Keg.destroy({ truncate: true });
  await Beer.destroy({ truncate: true });
  await Tap.destroy({ truncate: true });
};

function _generateRandomPour(){
  const floz = Math.random() * (MAX_POUR_FLOZ - MIN_POUR_FLOZ) + MIN_POUR_FLOZ;
  const milliliters = Math.round( floz * ML_PER_FLOZ) ;

  return {
    durationSeconds: Math.round( floz * SECONDS_PER_FLOZ ),
    tickCount: milliliters / ML_PER_TICK,
    milliliters
  };
}

function _pickTimeBetween( startDate, endDate ){
  const durationSeconds = moment( endDate ).diff( startDate, 'seconds' );
  const offsetSeconds = Math.floor( Math.random() * durationSeconds );
  return moment( startDate ).add( offsetSeconds, 'seconds' ).toDate();
}

exports.generatePours = async function( tap, { pourCount = 10, firstPourDaysAgo = 10, transaction } = {}){
  const { Pour, Tap } = require('../../../api/models').models;

  tap = await Tap.findByTapIndexWithBeer( tap.tapIndex, transaction);

  const pourPlan = Array(firstPourDaysAgo).fill().map( () => 0 );
  for( let p = 0; p < pourCount; p++ ){
    const day = Math.floor( Math.random() * firstPourDaysAgo );
    pourPlan[day]++;
  }

  const lastMoment = moment();

  const pours = [];
  //let dayIndex = -firstPourDaysAgo;

  for( let d = 0; d < pourPlan.length; d++ ) {
    const pourCountForDay = pourPlan[d];
    if( pourCountForDay === 0 ) continue;

    const daysAgo = Math.abs( d - pourPlan.length );
    const startOfDayDate = moment(lastMoment).subtract( daysAgo, 'days' ).startOf('day').toDate();
    const endOfDayDate = moment(startOfDayDate).endOf('day').toDate();

    for( let p = 0; p < pourCountForDay; p++ ) {

      const pour = _generateRandomPour();
      pour.createdAt = _pickTimeBetween( startOfDayDate, endOfDayDate );
      pour.kegId = tap.Keg.kegId;
      pour.beerId = tap.Beer.beerId;
      pour.tapIndex = tap.tapIndex;

      pours.push( pour );
      //dayIndex--;
    }
  }

  return await Pour.bulkCreate( pours, { transaction });
};

exports.addAKeg = async function( tap, beer, { gallons = 5, transaction } = {}){
  const { Keg, Tap } = require('../../../api/models').models;

  const keg = await Keg.create({
    beerId: beer.beerId,
    gallons
  }, { transaction });

  await Tap.update({
    kegId: keg.kegId
  },{
    where: {
      tapIndex: tap.tapIndex
    }
  }, { transaction });

  return keg;
};

exports.insertTaps = async function( transaction ){
  const { Tap } = require('../../../api/models').models;

  const tap1 = await Tap.create({
    tapIndex: 0,
    tapName: 'Left Tap'
  }, { transaction });

  const tap2 = await Tap.create({
    tapIndex: 1,
    tapName: 'Center Tap'
  }, { transaction });

  const tap3 = await Tap.create({
    tapIndex: 2,
    tapName: 'Right Tap'
  }, { transaction });

  return [tap1, tap2, tap3];
};

exports.insertBeers = async function( transaction ){
  const { Beer } = require('../../../api/models').models;

  const beer1 = await Beer.create({
    name: "Unholy Swill",
    imageUrl: "http://www.someurl.com/images/image1.png",
    abv: 6.7,
    ibu: 60,
    description: 'Disgusting'
  }, { transaction });

  const beer2 = await Beer.create({
    name: "Nectar of the Gods",
    imageUrl: "http://www.someurl.com/images/image2.png",
    abv: 12.5,
    ibu: 80,
    description: `I've died and gone to heaven`
  }, { transaction });

  const beer3 = await Beer.create({
    name: "Delicious IPA",
    imageUrl: "http://www.someurl.com/images/image3.png",
    abv: 9.4,
    ibu: 90,
    description: `Bitter and delicious`
  }, { transaction });

  return [beer1, beer2, beer3];
}
