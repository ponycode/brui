
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

  return Tap;
};

