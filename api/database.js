/* eslint-disable no-console */

const Sequelize = require('sequelize');
const path = require('path');
const sqlite = require('sqlite3');
const fs = require('fs');
const models = require('./models');

const dbPath = path.resolve( __dirname, 'brui.sqlite' );

async function _connect( databasePath ){
  if( !databasePath ) databasePath = 'brui.sqlite';
  databasePath = path.resolve( __dirname, databasePath );
  console.log('connecting to db', databasePath);

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


    const { Pour, Beer } = require('./models').models;
    let pours = await Pour.findAll({
      where: {
        createdAt: {
          $gt: new Date( new Date().getTime() - 30 * 24 * 60 * 60 * 1000 )
        }
      },
      order: [['createdAt', 'DESC']],
      limit: 1000,
      include: [Beer]
    })
    console.log( 'POURS', pours );


    //await sequelize.sync({ alter: true, force: false }); // CAUTION: force=true will delete data
  }catch( e ){
    console.error( 'Error connecting to db', e );
    throw e;
  }
};
