const path = require('path');
const fs = require('fs');
const basename  = path.basename( __filename );
const models = {};

exports.load = function( sequelize ){
  models.Op = sequelize.Op;
  models.sequelize = sequelize;
  
  fs.readdirSync( path.resolve( __dirname ) )
  .filter( file => {
    return ( file.indexOf('.') !== 0 ) && file !== basename && path.extname( file ) === '.js';
  })
  .forEach( file => {
    const model = sequelize['import']( path.join( __dirname, file ) );
    models[model.name] = model;
  });
  
  Object.keys( models ).forEach( modelName => {
    if( models[modelName].associate ){
      models[modelName].associate( models );
    }
  });

  models.transaction = function( work ){
    return sequelize.transaction( work );
  };
};

exports.models = models;
