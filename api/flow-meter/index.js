const FlowMeter = require('./FlowMeter');

const flowMeters = [];

exports.listen = function({ pinConfig, pourListener }){
  if( !pinConfig ) throw new Error(`pinConfig is required`);
  if( !pourListener ) throw new Error(`pourListener is required`);

  pinConfig.forEach( ({ type, gpioPin, tapIndex }) => {
    if( type !== 'flow' ) return;

    const flowMeter = new FlowMeter( FlowMeter.createGPIO( gpioPin ) );
    flowMeter.on('pour_start', pourListener.pourStart.bind( pourListener, tapIndex ) );
    flowMeter.on('pour_status', pourListener.pourStatus.bind( pourListener, tapIndex ) ); 
    flowMeter.on('pour_end', pourListener.pourEnd.bind( pourListener, tapIndex ) );
    flowMeters.push( flowMeter );
  });
};
