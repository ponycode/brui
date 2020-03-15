const SimulatedFlowMeter = require('../flow-meter/SimulatedFlowMeter');
const socketActions = require('./socketActions');
const simulatedFlowMeter = new SimulatedFlowMeter();
const WakeUp = require('../lib/Wakeup');

class SocketListener {

  onSocketMessage( message ){
    switch( message.type ){

      case 'get_keg_statuses':
        socketActions.sendKegStatuses();
        break;

      case 'start_simulated_pour':
        simulatedFlowMeter.startSimulatingPour( message.data.tapIndex );
        break;

      case 'end_simulated_pour':
        simulatedFlowMeter.stopSimulatingPour( message.data.tapIndex );
        break;

      case 'screen_sleep':
        WakeUp.sleep();
        break;

      case 'screen_wake':
        WakeUp.loudNoise();
        break;
  
      default:
        console.log(`Unknown socket message type: ${message.type}`);
    }
  }

}

module.exports = new SocketListener();
