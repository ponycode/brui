/* eslint-disable no-console */

const Sequelize = require('sequelize');
const path = require('path');
const sqlite = require('sqlite3');
const fs = require('fs');
const models = require('./models');

const dbPath = path.resolve( __dirname, 'brui.sqlite' );

let sequelize = null;

async function _connect(){

   sequelize = new Sequelize( 'brui', 'brui-user', 'brui-password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: dbPath
  });

  await sequelize.authenticate()
   
  console.log('Connection has been established successfully.');
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

async function _updateSchema(){
  await models.load( sequelize );
  await sequelize.sync();
}

( async function(){
  try{
    await _createDb();
    await _connect();
    await _updateSchema();
  }catch( e ){
    console.error( 'Error connecting to db', e );
  }
})();
