
module.exports = ( sequelize, DataTypes ) => {

  const Setting = sequelize.define( 'Setting', {
    numberOfTaps: {
      type: DataTypes.INTEGER
    }
  });

  return Setting;
};

