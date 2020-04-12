
module.exports = ( sequelize, DataTypes ) => {

  const BeerImage = sequelize.define( 'BeerImage', {
    beerId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    contentType: {
      type: DataTypes.TEXT
    },
    blob: {
      type: DataTypes.BLOB
    }
  });

  BeerImage.associate = function( models ){
    const { Beer, BeerImage } = models;
    BeerImage.belongsTo( Beer, { foreignKey: 'beerId' });
  };

  return BeerImage;
};

