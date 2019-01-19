const path = require('path');
const fs = require('fs');
const basename  = path.basename( __filename );
const models = {};

exports.load = async function( sequelize ){
  fs.readdirSync( path.resolve( __dirname ) )
  .filter( file => {
    return ( file.indexOf('.') !== 0 ) && file !== basename && file.slice(-3) === '.js';
  })
  .forEach( file => {
    const model = sequelize['import']( path.join( __dirname, file ) );
    models[model.name] = model;
  });
  
  Object.keys( models).forEach( modelName => {
    if( models[modelName].associate ){
      models[modelName].associate( models );
    }
  });
  
};

exports.sync = async function(){

};

exports.models = function(){
  return models;
}
