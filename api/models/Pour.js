
module.exports = ( sequelize, DataTypes ) => {

  const Pour = sequelize.define( 'Pour', {
    pourId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    kegId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tapIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    durationSeconds: {
      type: DataTypes.INTEGER
    },
    tickCount: {
      type: DataTypes.INTEGER
    },
    milliliters: {
      type: DataTypes.DECIMAL
    }
  });

  Pour.associate = function( models ){
    const { Keg, Pour } = models;
    Pour.belongsTo( Keg, { foreignKey: 'kegId' });
  };

  return Pour;
};

