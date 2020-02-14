const assert = require('chai').assert;
const dbUtils = require('../lib/dbUtils');
const axios = require('axios').create({
  baseURL: 'http://localhost:8081'
});
const _ = require('lodash');

describe('Pours Routes', function(){

  beforeEach( dbUtils.emptyDB );

  describe('stats', function(){

    it('fetches chart data for a single keg', async function(){
      const [tap] = await dbUtils.insertTaps();
      const [beer] = await dbUtils.insertBeers();
      await dbUtils.addAKeg( tap, beer );
      await dbUtils.generatePours( tap, { pourCount: 10, firstPourDaysAgo: 10 });

      const { data: { poursChart: { labels, datasets: [dataset] } } } = await axios.get('/api/pours/chart');
      assert.isTrue( labels.length > 0 && labels.length < 10 ); // it's random
      assert.equal( dataset.label, beer.name );
      assert.ok( dataset.backgroundColor );
      
      _assertPours( dataset, 10 );
    });

    function _assertPours( dataset, expectedPourCount ){
      const totalPours = dataset.data.reduce( ( sum, count ) => {
        return sum + count;
      }, 0 );
      assert.equal( totalPours, expectedPourCount );
    }

    it('fetches chart data for multiple kegs', async function(){
      const [tap1, tap2] = await dbUtils.insertTaps();
      const [beer1, beer2] = await dbUtils.insertBeers();
      await dbUtils.addAKeg( tap1, beer1 );
      await dbUtils.addAKeg( tap2, beer2 );

      await dbUtils.generatePours( tap1, { pourCount: 10, firstPourDaysAgo: 10 });
      await dbUtils.generatePours( tap2, { pourCount: 10, firstPourDaysAgo: 10 });

      const { data: { poursChart: { labels, datasets } } } = await axios.get('/api/pours/chart');
      assert.isTrue( labels.length > 0 && labels.length <= 10 ); // it's random
      
      const dataset1 = _.find( datasets, { label: beer1.name });
      const dataset2 = _.find( datasets, { label: beer2.name });

      _assertPours( dataset1, 10 );
      _assertPours( dataset2, 10 );
    });

  });

});
