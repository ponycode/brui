import store from './store'

const socket = new WebSocket("ws://" + location.host + "/sockets");

socket.addEventListener( 'open', event => {
    socket.send( JSON.stringify( { type: 'get_keg_statuses' } ), event );
    _bindPourSimulatorKeyListeners();
});

socket.addEventListener( 'message', event => {
    const message = JSON.parse( event.data );

    // eslint-disable-next-line no-console
    //console.log('Message from server ', message);

    if( message.type === 'pour_start' ){

      // Timeout if we don't get a close message
      // message.timeout = setTimeout( () => {
      //   store.commit('POUR_END', message )
      // }, 20000 ) 

      store.commit('POUR_START', message )

    }else if ( message.type === 'pour_status' ){

      store.commit('POUR_STATUS', message )

    }else if( message.type === 'pour_end' ){

      setTimeout( () => {
        store.commit('POUR_END')
      }, 2000 )

    }else if( message.type === 'reload_taps' ){

      store.dispatch('fetchTaps', false)

    }else if( message.type === 'keg_statuses' ){
console.log('KEG STATUSES', message.data)
      store.commit('SET_KEG_STATUSES', message.data)

    }
});

const ALLOW_KEYBOARD_POUR_SIMULATION = true

function _bindPourSimulatorKeyListeners(){
  if( !ALLOW_KEYBOARD_POUR_SIMULATION ) return;

  let numberPressed = false;
  let simulatingPour = false;

  document.addEventListener('keydown', e => {
    if( ['1', '2', '3'].indexOf(e.key)  === -1 ) return;

    if( simulatingPour ) return; // one at a time

    numberPressed = e.key;
    
    if( !simulatingPour ){
      simulatingPour = true
      // eslint-disable-next-line no-console
      console.log("START POUR", numberPressed )
      socket.send(JSON.stringify({ type: 'start_simulated_pour', data: { tapIndex: parseInt(numberPressed, 10) - 1 } }));
    }
  });

  document.addEventListener('keyup', e => {
    if( ['1', '2', '3'].indexOf(e.key)  === -1 ) return;

    if( e.key === numberPressed ){
      if( simulatingPour ){
        simulatingPour = false
        // eslint-disable-next-line no-console
        console.log("END POUR", numberPressed)
        socket.send(JSON.stringify({ type: 'end_simulated_pour', data: { tapIndex: parseInt(numberPressed, 10) - 1 } }));
      }
      numberPressed = false;
    }

  });

}
