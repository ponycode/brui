const { execSync } = require('child_process');
const DISPLAY_0 = { DISPLAY: ':0' };

class WakeUp {

  /**
   * This will wakeup from the screensaver on raspberry pi
   */
  static loudNoise(){
    try{
      execSync('/opt/vc/bin/tvservice -p', { // power on HDMI
        env: DISPLAY_0
      })
      execSync('xset s reset', {  // Turn off screensaver
        env: DISPLAY_0
      })
      console.log('BANG BANG BANG!');
    }catch( e ){
      console.error(`Error making loud noise: ${e}`);
    }
  }

  static sleep(){
    try{
      execSync('/opt/vc/bin/tvservice -0', { // power off HDMI
        env: DISPLAY_0
      })
      console.log('GO TO SLEEP!');
    }catch( e ){
      console.error(`Error going to sleep: ${e}`);
    }
  }

}

module.exports = WakeUp;
