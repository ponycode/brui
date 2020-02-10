
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
    }
  });

  Keg.associate = function( models ){
    const { Keg, Beer, Tap, Pour } = models;
    Keg.hasOne( Tap, { foreignKey: 'kegId' });
    Keg.belongsTo( Beer, { foreignKey: 'beerId' });
    Keg.hasMany( Pour, { foreignKey: 'kegId' } );
  };

  return Keg;
};

