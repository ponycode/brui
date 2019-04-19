const assert = require('chai').assert;
const FlowMeter = require('../../api/flow-meter/FlowMeter');

describe('FlowMeter', function() {

  it('should emit events properly', function( done ){
    const flowMeter = new FlowMeter({ watch(){}, unwatch(){}, unexport(){} });

    let startCount = 0;
    let endCount = 0;
    let endData = null;

    flowMeter.on('pour_start', () => {
      startCount++;
    })

    flowMeter.on('pour_end', (data) => {
      endCount++;
      endData = data;
    })

    flowMeter.startPour();
    for( let i = 0; i < 1000; i++ ){
      flowMeter.continuedPour();
    }

    setTimeout( () => {
      assert.equal( startCount, 1 );
      assert.equal( endCount, 1 );
      assert.equal( endData.pourTickCount, 1001 );
      assert.approximately( endData.durationSeconds, 0.001, 0.01 );
      done();
    }, FlowMeter.POUR_END_CHECK_INTERVAL_MS * 3 );
  });

    it('should ignore single tick pours - gravity or air bubbles', function( done ){
      const flowMeter = new FlowMeter({ watch(){}, unwatch(){}, unexport(){} });

      let started = false;
      let ended = false;

      flowMeter.on('pour_start', () => {
        started = true;
      })

      flowMeter.on('pour_end', () => {
        ended = true;
      })

      flowMeter.startPour();
      flowMeter.continuedPour(); // Need at least 2 ticks to even run the code that emits start

      setTimeout( () => {
        assert.isFalse( started );
        assert.isFalse( ended );
        done();
      }, FlowMeter.POUR_END_CHECK_INTERVAL_MS * 3 );
    });

});
