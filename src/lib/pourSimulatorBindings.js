import socket from '../sockets'

class PourSimulatorListener {

  constructor(){
    this.simulatingPour = false;
    this.numberBeingPressed = false;
  }

  startPour( tapIndex ){
    if( this.simulatingPour ) return; // one at a time
    
    this.simulatingPour = true

    // eslint-disable-next-line no-console
    console.log("START SIMULATED POUR")
    socket.send(JSON.stringify({ type: 'start_simulated_pour', data: { tapIndex } }));
  }

  endPour( tapIndex ){
    if( !this.simulatingPour ) return; // nothing to finish

    this.simulatingPour = false

    // eslint-disable-next-line no-console
    console.log("END SIMULATED POUR")
    socket.send(JSON.stringify({ type: 'end_simulated_pour', data: { tapIndex } }));
  }
}

export default PourSimulatorListener
