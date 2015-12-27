/*
 * === DBT - Depth below transducer ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5   6 7
 *        |   | |   | |   | |
 * $--DBT,x.x,f,x.x,M,x.x,F*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Depth, feet
 * 2. f = feet
 * 3. Depth, meters
 * 4. M = meters
 * 5. Depth, Fathoms
 * 6. F = Fathoms
 * 7. Checksum
 */

var helpers = require("../helpers.js")


exports.ID = 'DBT';
exports.TYPE = 'depth-transducer';

exports.decode = function(fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    depthFeet: +fields[1],
    depthMeters: +fields[3],
    depthFathoms: +fields[5]
  }
}

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeFixed(msg.depthFeet,2));
  result.push('f');
  result.push(helpers.encodeFixed(msg.depthMeters, 2));
  result.push('M');
  result.push(helpers.encodeFixed(msg.depthFathoms, 2));
  result.push('F');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
}
