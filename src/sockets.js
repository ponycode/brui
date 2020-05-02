import store from './store'

const listeners = [];

const pourEventBus = {

  register( callback ){
    listeners.push( callback );
  },

  emit( message ){
    for( let l of listeners ){
      l( message );
    }
  }

}

class SocketWrapper {

  constructor( socket ){
    this.socket = socket
    this.socket.addEventListener( 'open', () => {
      this.sendMessage( { type: 'get_keg_statuses' } )
    })

    this.socket.addEventListener( 'message', event => {
      const message = JSON.parse( event.data )
      if( !message.type ){
        /* eslint-disable no-console */
        console.log(`BAD MESSAGE FROM SERVER, no type: ${JSON.stringify(message)}`)
        return
      }
      this.handleMessage( message )
    })
  }

  handleMessage( message ){
    if( message.type === 'pour_start' ){

      pourEventBus.emit( message );

    }else if ( message.type === 'pour_status' ){

      //store.commit('POUR_STATUS', message )
      pourEventBus.emit( message );

    }else if( message.type === 'pour_end' ){

      setTimeout( () => {
        pourEventBus.emit( message );
      }, 2000 ) // leave the modal up an extra 2 seconds

    }else if( message.type === 'reload_taps' ){

      store.dispatch('fetchTaps', false)

    }else if( message.type === 'keg_statuses' ){

      store.commit('SET_KEG_STATUSES', message.data)

    }else if( message.type === 'temp_humidity_update' ){

      store.commit('SET_TEMP_AND_HUMIDITY', message )

    }
  }

  sendMessage( message ){
    if( !message.type ) throw new Error(`Socket messages must have a type key`)
    this.socket.send( JSON.stringify( message ) );
  }

}

const socket = new SocketWrapper( new WebSocket( `ws://${location.host}/sockets` ) );

export { socket, pourEventBus }
