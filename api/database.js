/* eslint-disable no-console */

const Sequelize = require('sequelize');
const path = require('path');
const sqlite = require('sqlite3');
const fs = require('fs');
const models = require('./models');

const dbPath = path.resolve( __dirname, 'brui.sqlite' );

async function _connect( databasePath ){
  if( !databasePath ) databasePath = path.resolve( __dirname, 'brui.sqlite' );

   const sequelize = new Sequelize( 'brui', 'brui-user', 'brui-password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: databasePath
  });

  await sequelize.authenticate()
   
  console.log('Connection has been established successfully.');

  return sequelize;
}

async function _createDb(){
  if( fs.existsSync( dbPath ) ) return;

  return new Promise( ( resolve, reject ) => {
    const db = new sqlite.Database( dbPath );

    db.on( 'open', function(){
      console.log( `Created empty sqlite db: '${dbPath}'` );
      db.close();
    });

    db.on( 'error', function( error ){
      console.log( `Error creating sqlite db: '${dbPath}'`, error );
      reject( error );
    });

    db.on( 'close', function(){
      resolve();
    });
  });
}

exports.connect = async function( databasePath ){
  try{
    await _createDb();
    const sequelize = await _connect( databasePath );
    models.load( sequelize );
    await sequelize.sync({ alter: true, force: false }); // CAUTION: force=true will delete data
  }catch( e ){
    console.error( 'Error connecting to db', e );
    throw e;
  }
};
