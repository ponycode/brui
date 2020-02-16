( async () => {
  
  const ENVIRONMENT = 'test';

  const database = require('../../database');
  await database.deleteDatabase( ENVIRONMENT );
  await database.ensureDatabaseExists( ENVIRONMENT );
  await database.migrateToLatest( ENVIRONMENT );

  // Responsible for connecting to db and starting the server
  await require('../../api/database').connect( ENVIRONMENT );

  await require('../../api/server');

  setTimeout( () => {
    if( typeof run === 'function' ){
      run();
    }else{
      process.exit(0); // used when testing this file directly
    }
  }, 500 );

})();

