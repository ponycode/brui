module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./api/brui.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
      stub: 'migration.stub'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: "../brui.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
      stub: 'migration.stub'
    }
  }
};
