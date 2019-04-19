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
      store.commit('START_POUR', message )
    }else if ( message.type === 'pour_status' ){
      store.commit('POUR_STATUS', message )
    }else if( message.type === 'pour_end' ){
      store.commit('STOP_POUR')
    }else if( message.type === 'reload_taps' ){
      store.dispatch('fetchTaps', false)
    }
});
