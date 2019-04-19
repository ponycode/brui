import store from './store'

const socket = new WebSocket('ws://localhost:8081/sockets')

socket.addEventListener('open', function (event) {
    socket.send('Hello Server!', event);
});

socket.addEventListener('message', function (event) {
    const message = JSON.parse( event.data );

    // eslint-disable-next-line no-console
    console.log('Message from server ', message);

    if( message.type === 'pour_start' ){

      store.commit('POUR_START', message )

    }else if ( message.type === 'pour_status' ){

      store.commit('POUR_STATUS', message )

    }else if( message.type === 'pour_end' ){

      setTimeout( () => {
        store.commit('POUR_END')
      }, 2000 );

    }else if( message.type === 'reload_taps' ){

      store.dispatch('fetchTaps', false)

    }
});
