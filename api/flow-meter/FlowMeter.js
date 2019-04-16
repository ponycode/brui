const EventEmitter = require('events');

class FlowMeter extends EventEmitter{

	constructor( gpio ){
    super();
		this.gpio = gpio;
		this.pouring = false;
		this.pourTickCount = 0;
		this.lastCheckedTickCount = 0;
    this.pourStartDate = null;
    this.lastTickDate = null;

		this.gpio.unwatch();
		this.gpio.watch( this.startPour.bind(this) )
	}

  /**
   * This gets called first and once per pour. It rewires the event to the
   * continuedPour method. It also sets an interval which will monitor the 
   * tick counts until they stop - meaning the pour is over.
   */
	startPour () {
		this.pouring = true;
		this.lastPourTickCount = this.pourTickCount = 1;
		this.pourStartDate = this.lastTickDate = new Date();

		this.gpio.unwatch();
		this.gpio.watch( this.continuedPour.bind(this) );

    this.interval = setInterval( this.checkForPourEnd.bind(this), 250 );
    this.emit( 'pour_start', {} );
	}

  /**
   * This is called second and continually until the pour is over.
   */
	continuedPour () {
		this.pourTickCount++;
		this.lastTickDate = new Date();
	}

  /**
   * This is called on an interval and will end a pour when ticks stop
   * being counted.
   */
	checkForPourEnd () {
		if( this.lastCheckedTickCount === this.pourTickCount ){
			// pour stopped
			this.pouring = false;

			clearInterval( this.interval );

			this.gpio.unwatch();
			this.gpio.watch( this.startPour.bind( this ) );

      const durationSeconds = (this.lastTickDate.getTime() - this.pourStartDate.getTime()) / 1000;

      this.emit( 'pour_end', { durationSeconds, pourTickCount: this.pourTickCount } );
		}else{
			// pour still running
      this.lastCheckedTickCount = this.pourTickCount;
		}
	}

}

module.exports = FlowMeter;
