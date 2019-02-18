
module.exports = ( sequelize, DataTypes ) => {

  const Setting = sequelize.define( 'Setting', {
    numberOfTaps: {
      type: DataTypes.INTEGER
    }
  });

  Setting.updateAllSettings = async function( settings ){
    return await Setting.upsert({
      id: 1,
      numberOfTaps: settings.numberOfTaps
    });
  };

  return Setting;
};

