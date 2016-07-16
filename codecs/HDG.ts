/*
 * === HDG - Heading - Deviation and Variation ===
 *
 * ------------------------------------------------------------------------------
 *        1   2   3 4   5 6
 *        |   |   | |   | |
 * $--HDG,x.x,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Magnetic Sensor heading in degrees
 * 2. Magnetic Deviation, degrees
 * 3. Magnetic Deviation direction, E = Easterly, W = Westerly
 * 4. Magnetic Variation, degrees
 * 5. Magnetic Variation direction, E = Easterly, W = Westerly
 * 6. Checksum
 */

exports.ID = 'HDG';
exports.TYPE = 'heading';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    heading: +fields[1],
    deviation: +fields[2],
    deviationDirection: fields[3],
    variation: +fields[4],
    variationDirection: fields[5],
  }
}
