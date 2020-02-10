
exports.emptyDB = async function(){
  const { Beer, Tap, Keg, Pour } = require('../../../api/models').models;
  await Pour.destroy({ truncate: true });
  await Keg.destroy({ truncate: true });
  await Tap.destroy({ truncate: true });
  await Beer.destroy({ truncate: true });
};
