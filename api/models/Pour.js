const moment = require('moment');
const { Op } = require('sequelize');

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
      type: DataTypes.FLOAT
    },
    simulated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Pour.associate = function( models ){
    const { Keg, Pour, Beer } = models;
    Pour.belongsTo( Keg, { foreignKey: 'kegId' });
    Pour.belongsTo( Beer, { foreignKey: 'beerId' });
  };

  Pour.findAllWithBeer = async function({ fromDaysAgo = 90, limit = 200, transaction } = {}){
    const { Beer } = require('.').models;

    return await Pour.findAll({
      where: {
        createdAt: {
          [Op.gt]: moment().subtract( fromDaysAgo, 'days' ).toDate()
        }
      },
      order: [['createdAt', 'DESC']],
      limit,
      include: [
        {
          model: Beer
        }
      ],
      transaction
    });
  };

  return Pour;
};

