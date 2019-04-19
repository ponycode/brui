
module.exports = ( sequelize, DataTypes ) => {

  const Tap = sequelize.define( 'Tap', {
    tapIndex: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tapName: {
      type: DataTypes.TEXT
    },
    beerId: {
      type: DataTypes.INTEGER
    }
  });

  Tap.findByTapIndexWithBeer = function( tapIndex ){
    const tap = this.findById( tapIndex );
    if( !tap ) return null;

    if( tap.beerId ) {
      // TODO: get associations working
      const { Beer } = require('.').models;
      tap.Beer = Beer.findById( tap.beerId )
    }
    
    return tap;
  };

  return Tap;
};

