( async () => {
  
  const fs = require('fs');

  const TEST_DB_PATH = require('path').resolve( __dirname, './test-db.sqlite');
  if( fs.existsSync( TEST_DB_PATH ) ){
    fs.unlinkSync( TEST_DB_PATH );
  }

  // Responsible for connecting to db and starting the server
  await require('../../api/database').connect( TEST_DB_PATH );

  await require('../../api/server');

  setTimeout( () => {
    run();
  }, 500 );

})();

