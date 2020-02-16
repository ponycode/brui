const path = require('path');
const fs = require('fs');
const util = require('util');

const exists = util.promisify( fs.exists );

const DATABASE_FOLDER_PATH = path.resolve( __dirname, '../database');

exports.configForEnvironment = function( environment ){
  if( !environment ) throw new Error(`You must provide an environment` ) ;
  const knexfile = require('../database/knexfile');
  const envConfig = knexfile[environment];
  if( !envConfig ) throw new Error(`No config for environment=${environment} found in database/knexfile.js`);
  return envConfig;
};

exports.databasePathForEnvironment = function( environment ){
  if( !environment ) throw new Error(`You must provide an environment` ) ;
  const envConfig = exports.configForEnvironment( environment );
  return path.resolve( DATABASE_FOLDER_PATH, envConfig.connection.filename );
};

exports.deleteDatabase = function( environment ){
  if( !environment ) throw new Error(`You must provide an environment` ) ;
  const databasePath = exports.databasePathForEnvironment( environment );
  fs.unlinkSync( databasePath );
};

function _configuredKnexInstance( environment ){
  if( !environment ) throw new Error(`You must provide an environment` ) ;
  const config = exports.configForEnvironment( environment );
  const knex = require('knex')( config );
  return {
    knex,
    config
  };
}

exports.migrateToLatest = async function( environment ){
  const { knex, config } = _configuredKnexInstance( environment );
  const [count, executedMigrations] = await knex.migrate.latest({ directory: config.migrations.directory });
  
  if( executedMigrations.length > 0 ){
    console.log(`\nExecuted migrations:`);
    for( let migration of executedMigrations ){
      console.log(`\t${migration}`);
    }
    console.log(`\n`);
  }
}

exports.currentMigrationVersion = async function( environment ){
  const { knex, config } = _configuredKnexInstance( environment );
  return await knex.migrate.currentVersion( config );
}

exports.listMigrations = async function( environment ){
  const { knex, config } = _configuredKnexInstance( environment );
  return await knex.migrate.list( config );
}

exports.ensureDatabaseExists = async function( environment ){
  const databasePath = exports.databasePathForEnvironment( environment );
  if( await exists( databasePath ) ) return;
  
  return new Promise( ( resolve, reject ) => {
    const sqlite = require('sqlite3');
    const db = new sqlite.Database( databasePath );

    db.on( 'open', function(){
      console.log( `Created empty sqlite db: '${databasePath}'` );
      db.close();
    });

    db.on( 'error', function( error ){
      console.log( `Error creating sqlite db: '${databasePath}'`, error );
      reject( error );
    });

    db.on( 'close', function(){
      resolve();
    });
  });
}
