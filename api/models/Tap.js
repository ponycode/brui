
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
    const { Keg, Beer, BeerImage } = require('.').models;

    return await this.findAll({
      include: [
        {
          model: Keg,
          include: [
            {
              model: Beer,
              include: [
                {
                  model: BeerImage,
                  attributes: ['contentType']
                }
              ]
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

  Tap.insertInitialTaps = async function( tapCount, transaction ){
    const taps = [];
    for( let i = 0; i < tapCount; i++ ){
      taps.push( await Tap.upsert({
        tapIndex: i,
        tapName: ''
      },
      {
        where: {
          tapIndex: i
        },
        transaction
      }));
    }
    return taps;
  }

  return Tap;
};

