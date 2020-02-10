
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

  return Keg;
};

