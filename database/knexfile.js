const path = require('path');

const DATABASE_FOLDER_PATH = path.resolve( __dirname, '../database');

function _options( sqliteFileName ){  
  return {
    client: 'sqlite3',
    connection: {
      filename: path.resolve( DATABASE_FOLDER_PATH, sqliteFileName )
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve( DATABASE_FOLDER_PATH, 'migrations' ),
      stub: 'migration.stub'
    }
  };
}

module.exports = {
  dev: _options( 'brui-dev.sqlite' ),
  test: _options( 'brui-test.sqlite' ),
  prod: _options( 'brui-prod.sqlite' )
};
