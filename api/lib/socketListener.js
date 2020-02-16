const SimulatedFlowMeter = require('../flow-meter/SimulatedFlowMeter');
const socketActions = require('./socketActions');
const simulatedFlowMeter = new SimulatedFlowMeter();

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

      default:
        console.log(`Unknown socket message type: ${message.type}`);
    }
  }

}

module.exports = new SocketListener();
