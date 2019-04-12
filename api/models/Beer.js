
module.exports = ( sequelize, DataTypes ) => {

  const Beer = sequelize.define( 'Beer', {
    beerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT
    },
    brewerName: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.TEXT
    },
    abv: {
      type: DataTypes.FLOAT
    },
    ibu: {
      type: DataTypes.INTEGER
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  return Beer;
};

