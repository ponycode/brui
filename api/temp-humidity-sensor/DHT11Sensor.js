const sensor = require("node-dht-sensor");
const { precision, tempFFromTempC } = require('../lib/utils');
class DHT11Sensor {

  constructor({ sockets, gpioPinNumber, sensorType = 11, readIntervalSeconds = 3 }){
    this.sockets = sockets;
    this.sensorType = sensorType; // 11 or 22 based on the sensor
    this.gpioPinNumber = gpioPinNumber;
    this.readIntervalSeconds = readIntervalSeconds;
  }

  start(){
    this.interval = setInterval( this.tick.bind(this), this.readIntervalSeconds * 1000 );
    this.tick();
  }

  stop(){
    if( this.interval ) clearInterval( this.interval );
  }

  async tick(){
    try{
      const { temperature: temperatureC, humidity: humidityPercent } = await sensor.read( this.sensorType, this.gpioPinNumber );
      const temperatureF = tempFFromTempC( temperatureC );
      console.log(`${new Date().toISOString()}; type=${this.sensorType}; pin=${this.gpioPinNumber}; temp: ${temperatureF}°F; humidity: ${humidityPercent}%`);
      this.sockets.broadcast({ 
        type: 'temp_humidity_update',
        temperatureF: precision( temperatureF, 1 ),
        temperatureC: precision( temperatureF, 1 ),
        humidityPercent: precision( humidityPercent, 1 )
      });
    }catch( error ){
      console.error(`Error reading temp & humidty: ${error}`);
    }
  }

}

module.exports = DHT11Sensor;
