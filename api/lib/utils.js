exports.FLOZ_PER_ML = 0.033814;
exports.GAL_PER_ML = 0.000264172;

exports.gallonsFromMilliliters = function( milliliters ){
  return exports.precision( milliliters * exports.GAL_PER_ML, 2 );
};

exports.flozFromMilliliters = function( milliliters ){
  return exports.precision( milliliters * exports.FLOZ_PER_ML, 1 );
};

exports.precision = function( value, decimals ){
  const d = Math.pow( 10, decimals );
  return Math.round( (value + Number.EPSILON) * d ) / d;
};

exports.tempFFromTempC = function( tempC ){
  return exports.precision( tempC * (9/5) + 32, 1 );
};
