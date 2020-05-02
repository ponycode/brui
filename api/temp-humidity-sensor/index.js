
const sensor = require("node-dht-sensor");

class DHT11Sensor {

	constructor({ sockets, gpioPinNumber, sensorType = 11, readIntervalSeconds = 3 }){
		this.sockets = sockets;
		this.sensorType = sensorType; // 11 or 22 based on the sensor
		this.gpioPinNumber = gpioPinNumber;
		this.readIntervalSeconds = readIntervalSeconds;
	}

	start(){
		this.interval = setInterval( this.tick.bind(this), this.readIntervalSeconds * 1000 );
	}

	stop(){
		if( this.interval ) clearInterval( this.interval );
	}

	async tick(){
		try{
			const { temperature: temperatureC, humidity: humidityPercent } = await sensor.read( this.sensorType, this.gpioPinNumber );
			const temperatureF = temperatureC * (9/5) + 32;
			console.log(`${new Date().toISOString()}; type=${this.sensorType}; pin=${this.gpioPinNumber}; temp: ${temperatureF}°F; humidity: ${humidityPercent}%`);
			this.sockets.broadcast({ type: 'temp_humidity_update', temperatureF, temperatureC, humidityPercent });
		}catch( error ){
			console.error(`Error reading temp & humidty: ${error}`);
		}
	}

}

let tempHumiditySensors = {};

exports.listen = function({ pinConfig, sockets }){
	if( !pinConfig ) throw new Error(`pinConfig is required`);
	if( !sockets ) throw new Error(`sockets is required`);
  
	pinConfig.forEach( ({ type, gpioPin, readIntervalSeconds }) => {
		if( type !== 'temp-humidity' ) return;

		let tempHumiditySensor = tempHumiditySensors[gpioPin];
		if( tempHumiditySensor ) dht11.stop();
		
		tempHumiditySensor = new DHT11Sensor({ gpioPinNumber: gpioPin, sockets, readIntervalSeconds });
		tempHumiditySensor.start();

		tempHumiditySensors[gpioPin] = tempHumiditySensor;
	});
};