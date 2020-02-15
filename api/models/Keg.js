const utils = require('../lib/utils');
const _ = require('lodash');


module.exports = ( sequelize, DataTypes ) => {

  const Keg = sequelize.define( 'Keg', {
    kegId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    beerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gallons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },
    finishedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    totalPourCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    totalPourMilliliters: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  });

  Keg.associate = function( models ){
    const { Keg, Beer, Tap, Pour } = models;
    Keg.hasOne( Tap, { foreignKey: 'kegId' });
    Keg.belongsTo( Beer, { foreignKey: 'beerId' });
    Keg.hasMany( Pour, { foreignKey: 'kegId' } );
  };

  Keg.getAllKegStatuses = async function(){
    const { Tap, sequelize } = require('.').models;

    const taps = await Tap.findAllWithKegs();
    const kegIds = [];
    const tapsByTapId = {};

    for( const tap of taps ){
      if( tap.Keg ){
        kegIds.push( tap.Keg.kegId );
        tapsByTapId[tap.tapIndex] = tap;
      }
    }
    
    const sql = `
      SELECT 
        kegId,
        ROUND( SUM(milliliters) ) as millilitersPoured
      FROM "Pours" p
      WHERE kegId IN(?)
      GROUP BY kegId;
    `;

    const pourTotals = await sequelize.query( sql, { replacements: [kegIds], type: sequelize.QueryTypes.SELECT });
    const pourTotalsByKegId = _.keyBy( pourTotals, 'kegId' );

    const results = [];

    for( const tap of taps ){
      const result = {
        tapIndex: tap.tapIndex
      };

      if( tap.Keg ){
        const { Keg: keg } = tap;

        let pourTotals = pourTotalsByKegId[keg.kegId];
        result.kegId = keg.kegId;
        result.gallonsTotal = keg.gallons,
        result.gallonsPoured = utils.gallonsFromMilliliters( pourTotals.millilitersPoured ),
        result.remainingPercent = 100 - utils.precision( (result.gallonsPoured / keg.gallons) * 100, 0 )
      }

      results.push( result );
    }

    return results;
  }

  return Keg;
};

