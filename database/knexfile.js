
function _options( sqliteFileName ){
  return {
    client: 'sqlite3',
    connection: {
      filename: sqliteFileName
    },
    useNullAsDefault: true,
    migrations: {
      directory: 'migrations',
      stub: 'migration.stub'
    }
  };
}

module.exports = {
  dev: _options( 'brui-dev.sqlite' ),
  test: _options( 'brui-test.sqlite' ),
  prod: _options( 'brui-prod.sqlite' )
};
