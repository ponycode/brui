
class SimulatedFlowMeter {

  constructor( pourListener ){
    this.pourListener = pourListener;
    this.simulatingPour = false;
    this.tapIndex = false;
    this.pourInterval = false;
    this.pourTimeout = false;
    this.durationSeconds = 0;
    this.pourTickCount = 0;
    this.pourStartTime = null
  }

  onSocketMessage( message ){
    if( message.event === 'start_simulated_pour' ){
      this.startSimulatingPour( message.tapIndex );
    }else if( message.event === 'end_simulated_pour' ){
      this.stopSimulatingPour();
    }
  }

  startSimulatingPour( tapIndex ){
    if( this.simulatingPour ) return;
    this.simulatingPour = true;
    this.tapIndex = tapIndex;
    this.pourStartTime = new Date().getTime();

    this.pourListener.pourStart( this.tapIndex );

    this.pourInterval = setInterval( () => {
      this.durationSeconds = Math.floor( ( new Date().getTime() - this.pourStartTime ) / 1000  );
      this.pourTickCount += 20;
      this.pourListener.pourStatus( this.tapIndex, { durationSeconds: this.durationSeconds, pourTickCount: this.pourTickCount })
    }, 200 );

    this.pourTimeout = setTimeout( () => {
      this.stopSimulatingPour();
    }, 10000 );
  }

  stopSimulatingPour(){
    clearInterval( this.pourInterval );
    clearTimeout( this.pourTimeout );

    //this.pourListener.pourEnd( this.tapIndex, { durationSeconds: this.durationSeconds, pourTickCount: this.pourTickCount });

    this.simulatingPour = false;
    this.tapIndex = false;
    this.pourInterval = null;
    this.pourTimeout = null;
    this.durationSeconds = 0;
    this.pourTickCount = 0;
    this.pourStartTime = null;
  }

}

module.exports = SimulatedFlowMeter;
