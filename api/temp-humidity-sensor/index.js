const DHT11Sensor = require('./DHT11Sensor');

let tempHumiditySensors = {};

exports.listen = function({ pinConfig, sockets }){
  if( !pinConfig ) throw new Error(`pinConfig is required`);
  if( !sockets ) throw new Error(`sockets is required`);
  
  pinConfig.forEach( ({ type, gpioPin, readIntervalSeconds }) => {
    if( type !== 'temp-humidity' ) return;

    let tempHumiditySensor = tempHumiditySensors[gpioPin];
    if( tempHumiditySensor ) tempHumiditySensor.stop();
    
    tempHumiditySensor = new DHT11Sensor({ gpioPinNumber: gpioPin, sockets, readIntervalSeconds });
    tempHumiditySensor.start();

    tempHumiditySensors[gpioPin] = tempHumiditySensor;
  });
  
};
