/*
 * === PRDID - RDI Proprietary Heading, Pitch, Roll ===
 *
 * ------------------------------------------------------------------------------
 *        1   2   3   4
 *        |   |   |   |
 * $PRDID,x.x,x.x,x.x*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Roll
 * 2. Pitch
 * 3. Heading
 * 4. Checksum
 */

exports.ID = 'RDID';
exports.TYPE = 'gyro';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    roll: +fields[1],
    pitch: +fields[2],
    heading: +fields[3],
  }
}
