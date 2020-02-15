const events = require('events');
const eventEmitter = new events.EventEmitter();
const WebSocket = require('ws');


let wss = null;

exports.init = function( server ){
  wss = new WebSocket.Server({ server, path: '/sockets' });

  wss.on("connection", ws => {
    console.log('ws connection', ws);

    ws.on('message', message => {
      // Incoming from client
      try{
        message = JSON.parse( message );
        eventEmitter.emit( 'message', message );
      }catch( e ){
        console.error(`Bad client socket message: ${message}`);
      }
    });
  });

};

exports.addMessageListener = function( listener ){
  eventEmitter.addListener( 'message', listener );
}

exports.broadcast = function broadcast( message ){
  if( !wss ) return;
  
  wss.clients.forEach( ws => {
    if( ws.readyState !== WebSocket.OPEN ) return;
    _send( ws, message );
  });
};

function _send( ws, message ){
  ws.send( JSON.stringify( message ) );
}
