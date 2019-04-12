
module.exports = ( sequelize, DataTypes ) => {

  const Setting = sequelize.define( 'Setting', {
    numberOfTaps: {
      type: DataTypes.INTEGER
    },
    tapNames: {
      type: DataTypes.TEXT
    }
  });

  Setting.findAllSettings = async function(){
    const settings = await Setting.findOne({
      id: 1
    });
    settings.tapNames = JSON.parse( settings.tapNames );
    return settings;
  };

  Setting.updateAllSettings = async function( settings ){
    return await Setting.upsert({
      id: 1,
      numberOfTaps: settings.numberOfTaps,
      tapNames: JSON.stringify( settings.tapNames )
    });
  };

  return Setting;
};

