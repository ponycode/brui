
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
  }, {
    getterMethods: {
      Beer() {
        if( !this.Keg ) return null;
        return this.Keg.Beer;
      }
    }
  });

  Tap.associate = function( models ){
    const { Tap, Keg } = models;
    Tap.belongsTo( Keg, { foreignKey: 'kegId' });
  };

  Tap.findByTapIndexWithBeer = async function( tapIndex, transaction ){
    const { Keg, Beer } = require('.').models;

    return await this.findByPk( tapIndex, {
      include: [
        {
          model: Keg,
          include: [
            {
              model: Beer
            }
          ]
        }
      ],
      transaction
    });
  };

  Tap.findAllWithBeers = async function(){
    const { Keg, Beer } = require('.').models;

    return await this.findAll({
      include: [
        {
          model: Keg,
          include: [
            {
              model: Beer
            }
          ]
        }
      ]
    });
  };

  Tap.findAllWithKegs = async function(){
    const { Keg } = require('.').models;

    return await this.findAll({
      include: [
        {
          model: Keg
        }
      ]
    });
  };

  return Tap;
};

