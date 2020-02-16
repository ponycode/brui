/* eslint-disable no-console */

const Sequelize = require('sequelize');
const models = require('./models');
const database = require('../database');

let connected = false;

async function _connect( databasePath ){
   const sequelize = new Sequelize( 'brui', 'brui-user', 'brui-password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: databasePath,
    logging: false
  });

  await sequelize.authenticate()
   
  console.log('Sequelize is connected.');

  return sequelize;
}

exports.connect = async function( environment = 'dev' ){
  if( connected ) return;
  
  const databasePath = database.databasePathForEnvironment( environment );
  console.log(`sequelize connecting to ${environment} db:`, databasePath);

  try{
    await database.ensureDatabaseExists( environment );
    const sequelize = await _connect( databasePath );
    models.load( sequelize );
    models.DB_PATH = databasePath;
    
    // Never again - using knex migrations now
    //await sequelize.sync({ alter: true, force: false, logging: console.log });

    connected = true
  }catch( e ){
    console.error( 'Error connecting to db', e );
    throw e;
  }
};
