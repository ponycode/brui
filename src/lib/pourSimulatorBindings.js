import socket from '../sockets'

class PourSimulatorListener {

  constructor(){
    this.simulatingPour = false;
    this.numberBeingPressed = false;

    this
  }

  install(){
    document.addEventListener('keydown', this._keydown );
    document.addEventListener('keyup', this._keyup );
  }

  uninstall(){
    document.removeEventListener('keydown', this._keydown );
    document.removeEventListener('keyup', this._keyup );
  }

  _keydown( e ){
    if( this.simulatingPour ) return; // one at a time
    if( ['1', '2', '3'].indexOf(e.key)  === -1 ) return;
    
    this.simulatingPour = true
    this.numberBeingPressed = parseInt( e.key, 10 )

    // eslint-disable-next-line no-console
    console.log("START POUR", this.numberBeingPressed )
    socket.send(JSON.stringify({ type: 'start_simulated_pour', data: { tapIndex: this.numberBeingPressed - 1 } }));
  }

  _keyup( e ){
    if( !this.simulatingPour ) return; // nothing to finish
    if( ['1', '2', '3'].indexOf(e.key)  === -1 ) return;

    this.simulatingPour = false
    this.numberBeingPressed = false

    // eslint-disable-next-line no-console
    console.log("END POUR", this.numberBeingPressed )
    socket.send(JSON.stringify({ type: 'end_simulated_pour', data: { tapIndex: this.numberBeingPressed - 1 } }));
  }
}

export default PourSimulatorListener
