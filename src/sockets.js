import store from './store'

const socket = new WebSocket("ws://" + location.host + "/sockets");

socket.addEventListener( 'open', event => {
    socket.send( JSON.stringify( { type: 'get_keg_statuses' } ), event );
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

      store.commit('SET_KEG_STATUSES', message.data)

    }
});

export default socket
