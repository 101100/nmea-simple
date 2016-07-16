/*
 * === GSA - Active Satellites and Dilution of Precision ===
 *
 * ------------------------------------------------------------------------------
 *         1 2 3  4  5  6  7  8  9  10 11 12 13 14 15  16  17  18
 *         | | |  |  |  |  |  |  |  |  |  |  |  |  |   |   |   |
 *  $--GSA,a,x,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,x.x,x.x,x.x*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Selection of 2D or 3D fix
 *    A - Automatic
 *    M - Manual, forced to operate in 2D or 3D
 * 2. 3D fix
 *    1 - no fix
 *    2 - 2D fix
 *    3 - 3D fix
 * 3. PRN of satellite used for fix (may be blank)
 * ...
 * 14. PRN of satellite used for fix (may be blank)
 * 15. Dilution of precision
 * 16. Horizontal dilution of precision
 * 17. Vertical dilution of precision
 * 18. Checksum
 */

exports.ID = 'GSA';
exports.TYPE = 'active-satellites';

exports.decode = function(fields) {
  var sats = [];
  for (var i=3; i < 15; i++) {
    if (fields[i]) sats.push(+fields[i]);
  };
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    selectionMode: fields[1],
    mode: +fields[2],
    satellites: sats,
    PDOP: +fields[15],
    HDOP: +fields[16],
    VDOP: +fields[17]
  };
}
