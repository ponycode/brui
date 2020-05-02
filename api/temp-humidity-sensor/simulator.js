
class DHT11SensorSimulator {

  constructor({ sockets }){
    this.sockets = sockets;
  }

  start(){
    this.interval = setInterval( this.tick.bind(this), 3 * 1000 );
    this.tick();
  }

  stop(){
    if( this.interval ) clearInterval( this.interval );
  }

  async tick(){
    try{
      const temperatureC = 3;
      const temperatureF = temperatureC * (9/5) + 32;
      const humidityPercent = 40;
      console.log(`${new Date().toISOString()}; simulated=true; temp: ${temperatureF}°F; humidity: ${humidityPercent}%`);
      this.sockets.broadcast({ type: 'temp_humidity_update', temperatureF, temperatureC, humidityPercent });
    }catch( error ){
      console.error(`Error reading temp & humidty: ${error}`);
    }
  }
  
}

let simulatedTempHumiditySensors = {};


exports.listen = function({ pinConfig, sockets }){
  if( !pinConfig ) throw new Error(`pinConfig is required`);
  if( !sockets ) throw new Error(`sockets is required`);
  
  pinConfig.forEach( ({ type, gpioPin, readIntervalSeconds }) => {
    if( type !== 'temp-humidity' ) return;

    let tempHumiditySensor = simulatedTempHumiditySensors[gpioPin];
    if( tempHumiditySensor ) tempHumiditySensor.stop();
    
    tempHumiditySensor = new DHT11SensorSimulator({ gpioPinNumber: gpioPin, sockets, readIntervalSeconds });
    tempHumiditySensor.start();

    simulatedTempHumiditySensors[gpioPin] = tempHumiditySensor;
  });
  
};
