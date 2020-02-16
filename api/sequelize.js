/* eslint-disable no-console */

const Sequelize = require('sequelize');
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
    
    const models = exports.loadModels( sequelize );

    try{
      await exports.performInitialSetup( models );
    }catch( e ){
      debugger;
    }

    connected = true
  }catch( e ){
    console.error( 'Error connecting to db', e );
    throw e;
  }
};

exports.performInitialSetup = async function( models ){
  const { Setting, Tap, sequelize } = models;

  await sequelize.transaction( async transaction => {
    const existingSettings = await Setting.findAllSettings( transaction );

    if( !existingSettings ){
      console.log('Performing initial db setup');

      await Setting.updateAllSettings({
        numberOfTaps: 1
      }, transaction );

      await Tap.insertInitialTaps( 3, transaction );
    }
  });
}

exports.loadModels = function( sequelize ){
  const models = require('./models');
  models.load( sequelize );
  return models.models;
};
