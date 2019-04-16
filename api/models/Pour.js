
module.exports = ( sequelize, DataTypes ) => {

  const Pour = sequelize.define( 'Pour', {
    pourId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    beerId: {
      type: DataTypes.INTEGER
    },
    tapIndex: {
      type: DataTypes.INTEGER
    },
    durationSeconds: {
      type: DataTypes.INTEGER
    },
    tickCount: {
      type: DataTypes.INTEGER
    },
  });

  return Pour;
};

