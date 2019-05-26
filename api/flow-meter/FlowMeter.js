const EventEmitter = require('events');

const MIN_TICKS_FOR_POUR = 3;
const POUR_END_CHECK_INTERVAL_MS = 250;

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
    
    process.on( 'SIGINT', () => {
      this.gpio.unexport();
    });
  }
  
  // This is mainly to keep testability
  static createGPIO( gpioPin ){
    const GPIO = require('onoff').Gpio;
    return new GPIO( gpioPin, 'in', 'rising', { activeLow: false } );
  }

  get durationSeconds(){
    const seconds = (this.lastTickDate.getTime() - this.pourStartDate.getTime()) / 1000.0;
    return Math.round( seconds * 100 ) / 100;
  }

  /**
   * This gets called first and once per pour. It rewires the event to the
   * continuedPour method. It also sets an interval which will monitor the 
   * tick counts until they stop - meaning the pour is over.
   */
  startPour () {
    this.pouring = true;
    this.startEmitted = false;
    this.lastPourTickCount = this.pourTickCount = 1;
    this.pourStartDate = this.lastTickDate = new Date();

    this.gpio.unwatch();
    this.gpio.watch( this.continuedPour.bind(this) );

    this.interval = setInterval( this.checkForPourEnd.bind(this), POUR_END_CHECK_INTERVAL_MS );
  }

  /**
   * This is called second and continually until the pour is over.
   */
  continuedPour () {
    this.pourTickCount++;
    this.lastTickDate = new Date();
    
    if( !this.startEmitted && this.pourTickCount >= MIN_TICKS_FOR_POUR ){
      // Moved the start event in here because I was seeing a bunch of 1 and 2
      // tick pours - 1 per hour roughly. I assume this is either air moving up
      // or gravity pulling beer down. Decided to only count pours with 3 ticks or more
      this.startEmitted = true;
      this.emit( 'pour_start', {} );
    }else{
      this.emit( 'pour_status', { durationSeconds: this.durationSeconds, pourTickCount: this.pourTickCount } );
    }
  }

  /**
   * This is called on an interval and will end a pour when ticks stop
   * being counted.
   */
  checkForPourEnd () {
    if( this.lastCheckedTickCount === this.pourTickCount ){
      // pour stopped

      clearInterval( this.interval );
      this.interval = null;

      this.gpio.unwatch();
      this.gpio.watch( this.startPour.bind( this ) );

      if( this.startEmitted ){
        // Don't emit end event if we didn't emit a start event
        this.emit( 'pour_end', { durationSeconds: this.durationSeconds, pourTickCount: this.pourTickCount } );
      }

      this.startEmitted = false;
      this.pouring = false;

    }else{
      // pour still running
      this.lastCheckedTickCount = this.pourTickCount;
    }
  }

}

FlowMeter.POUR_END_CHECK_INTERVAL_MS = POUR_END_CHECK_INTERVAL_MS;
FlowMeter.MIN_TICKS_FOR_POUR = MIN_TICKS_FOR_POUR;

module.exports = FlowMeter;
