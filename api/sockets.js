const WebSocket = require('ws');

let wss = null;

exports.init = function( server ){
  wss = new WebSocket.Server({ server, path: '/sockets' });

  wss.on("connection", ws => {
    console.log('ws connection', ws);
 });

};

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
