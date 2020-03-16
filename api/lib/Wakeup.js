/* eslint-disable no-console */

const { execSync } = require('child_process');
const DISPLAY_0 = { DISPLAY: ':0' };

const MS_IN_HOUR = 60 * 60 * 1000;

let autoSleepTimeout = null;

// function _sleepForMs( ms ){
//   return new Promise( function( resolve ){
//     setTimeout( resolve, ms );
//   });
// }

class WakeUp {

  /**
   * This will wakeup from the screensaver on raspberry pi
   */
  static async loudNoise(){
    try{
      this.hdmiOn();
      //_sleepForMs( 500 );
      //this.screenSaverOff();
      console.log('BANG BANG BANG!');
    }catch( e ){
      console.error(`Error making loud noise: ${e}`);
    }

    if( autoSleepTimeout ) clearTimeout( autoSleepTimeout );

    autoSleepTimeout = setTimeout( () => {
      autoSleepTimeout = null;
      WakeUp.sleep();
    }, 1 * MS_IN_HOUR );
  }

  static sleep(){
    try{
      this.hdmiOff();
      console.log('GO TO SLEEP!');
    }catch( e ){
      console.error(`Error going to sleep: ${e}`);
    }
  }

  static hdmiOff(){
    try{
      // /opt/vc/bin/tvservice -o
      execSync('vcgencmd display_power 0', { // power off HDMI
        env: DISPLAY_0
      });
    }catch( e ){
      console.error( `Error turning HDMI off`, e );
    }
  }

  static hdmiOn(){
    try{
      // /opt/vc/bin/tvservice -p -> resulted in a blank screen after coming back on
      execSync('vcgencmd display_power 1', { // power on HDMI
        env: DISPLAY_0
      });
    }catch( e ){
      console.error( `Error turning HDMI on`, e );
    }
  }

  static screenSaverOff(){
    try{
      execSync('xset s reset', {  // Turn off screensaver
        env: DISPLAY_0
      });
    }catch( e ){
      console.error( `Error turning screen saver off`, e );
    }
  }

  static screenSaverOn(){
    try{
      execSync('xset s activate', {  // Turn on screensaver
        env: DISPLAY_0
      });
    }catch( e ){
      console.error( `Error turning screen saver on`, e );
    }
  }

}

module.exports = WakeUp;
