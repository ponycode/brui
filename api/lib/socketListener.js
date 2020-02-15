const socketMessages = require('../lib/socketMessages');
const SimulatedFlowMeter = require('../flow-meter/SimulatedFlowMeter');
const simulatedFlowMeter = new SimulatedFlowMeter();

class SocketListener {

  onSocketMessage( message ){
    switch( message.type ){

      case 'get_keg_statuses':
        this._handleFetchKegStatuses();
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

  async _handleFetchKegStatuses(){
    const { Keg } = require('../models').models;
    const statuses = await Keg.getAllKegStatuses();
    socketMessages.sendKegStatuses( statuses );
  }

}

module.exports = new SocketListener();
