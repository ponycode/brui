
module.exports = ( sequelize, DataTypes ) => {

  const Setting = sequelize.define( 'Setting', {
    numberOfTaps: {
      type: DataTypes.INTEGER
    }
  });

  Setting.findAllSettings = async function(){
    const settings = await Setting.findOne({
      where: {
        id: 1
      }
    });
    return settings;
  };

  Setting.updateAllSettings = async function( settings, transaction ){
    await Setting.upsert({
      id: 1,
      numberOfTaps: settings.numberOfTaps
    },
    {
      where: {
        id: 1
      },
      transaction
    });
    
    return await this.findAllSettings();
  };

  return Setting;
};

