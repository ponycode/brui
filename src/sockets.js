import store from './store'

const socket = new WebSocket('ws://localhost:8081/sockets')

socket.addEventListener('open', function (event) {
    socket.send('Hello Server!', event);
});

socket.addEventListener('message', function (event) {
    const message = JSON.parse( event.data );
    console.log('Message from server ', message);

    if( message.type === 'pour_start' ){
      store.commit('SET_POURING', true)
    }else if( message.type === 'pour_end' ){
      store.commit('SET_POURING', false)
    }else if( message.type === 'reload_taps' ){
      store.dispatch('fetchTaps', false)
    }
});
