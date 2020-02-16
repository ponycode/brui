module.exports = {
  client: 'sqlite3',
  connection: {
    filename: "./api/brui.sqlite"
  },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
    stub: 'migration.stub'
  }
};
