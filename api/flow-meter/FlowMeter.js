
class FlowMeter {

	constructor( gpio ){
		this.gpio = gpio;
		this.pouring = false;
		this.pourTickCount = 0;
		this.lastCheckedTickCount = 0;
		this.startHrTime = null;
		this.diffHrTime = null;

		this.gpio.unwatch();
		this.gpio.watch( this.startPour.bind(this) )
	}

	startPour () {
		console.log("Pour started");

		this.pouring = true;

		this.pourTickCount = 1;
		this.lastPourTickCount = this.pourTickCount;

		this.startHrTime = process.hrtime();
		this.diffHrTime = process.hrtime( this.startHrTime );

		this.gpio.unwatch();
		this.gpio.watch( this.continuedPour.bind(this) );

		this.interval = setInterval( this.checkForPourEnd.bind(this), 1000 );
	}

	continuedPour () {
		this.pourTickCount++;
		this.diffHrTime = process.hrtime( this.startHrTime );
	}

	checkForPourEnd () {
		const pourTickCount = this.pourTickCount;
		// const diffHrTime = this.diffHrTime;

		if( this.lastCheckedTickCount === pourTickCount ){
			// pour stopped
			this.pouring = false;

			clearInterval( this.interval );

			this.gpio.unwatch();
			this.gpio.watch( this.startPour.bind( this ) );

			console.log("Pour Stopped", this.pourTickCount, this.diffHrTime);
		}else{
			// pour still running
			this.lastCheckedTickCount = this.pourTickCount;
		}
	}

}

module.exports = FlowMeter;
