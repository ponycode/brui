const { exec } = require('child_process');

class WakeUp {

  /**
   * This will wakeup from the screensaver on raspberry pi
   */
  static loudNoise(){
    try{
      exec('xset s reset', {
        env: {
          DISPLAY: 0
        }
      })
    }catch( e ){
      console.error(`Error making loud noise: ${e}`);
    }
  }

}

module.exports = WakeUp;
