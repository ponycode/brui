const sockets = require('../sockets');

exports.sendKegStatuses = function( kegStatuses ){
  if( !kegStatuses ) return;
  sockets.broadcast({ type: 'keg_statuses', data: kegStatuses })
}

exports.sendPourStart = function( tapIndex, beerName ){
  sockets.broadcast({ type: 'pour_start', tapIndex, beerName });
}

exports.sendPourStatus = function({ tapIndex, durationSeconds, pourTickCount, milliliters }){
  sockets.broadcast({ type: 'pour_status', tapIndex, durationSeconds, pourTickCount, milliliters });
}

exports.sendPourEnd = function({ tapIndex, durationSeconds, milliliters, pourTickCount, pourId }){
  sockets.broadcast({ type: 'pour_end', tapIndex, durationSeconds, milliliters, pourTickCount, pourId });
}
