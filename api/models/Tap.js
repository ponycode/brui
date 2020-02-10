
module.exports = ( sequelize, DataTypes ) => {

  const Tap = sequelize.define( 'Tap', {
    tapIndex: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    tapName: {
      type: DataTypes.TEXT
    },
    kegId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Tap.associate = function( models ){
    const { Tap, Keg } = models;
    Tap.belongsTo( Keg, { foreignKey: 'kegId' });
  };

  Tap.findByTapIndexWithBeer = async function( tapIndex ){
    const tap = await this.findById( tapIndex );
    if( !tap ) return null;

    if( tap.beerId ) {
      // TODO: get associations working
      const { Beer } = require('.').models;
      tap.Beer = await Beer.findById( tap.beerId )
    }
    
    return tap;
  };

  return Tap;
};

