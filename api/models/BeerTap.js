
module.exports = ( sequelize, DataTypes ) => {

  const BeerTap = sequelize.define( 'BeerTap', {
    name: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    }
  });

  return BeerTap;
};

