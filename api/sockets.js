const WebSocket = require('ws');

module.exports = function( server ){
  const wss = new WebSocket.Server({ server, path: '/sockets' });

  let interval = null;

  wss.on("connection", function(ws){
    console.log('ws connection');

    let started = false;
/*
    interval = setInterval( function(){
      if( !started ){
        _send( ws, {
          type: 'pour_start'
        });
        started = true;
      }else{
        _send( ws, {
          type: 'pour_end'
        });
        started = false;
      }
      
     }, 5000 )

    ws.on('close', function close() {
      clearInterval( interval );
    });
    */
 });

};

function _send( ws, message ){
  ws.send( JSON.stringify( message ) );
}
