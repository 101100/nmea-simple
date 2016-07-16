/*
 * === HDM - Heading - Magnetic ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3
 *        |   | |
 * $--HDM,x.x,M*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Heading degrees, magnetic
 * 2. M = Magnetic
 * 3. Checksum
 */

var helpers = require("../helpers.js")


exports.ID = 'HDM';
exports.TYPE = 'heading-info-magnetic';

exports.decode = function (fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    heading: +fields[1]
  }
};

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID];
  result.push(helpers.encodeFixed(msg.heading, 1));
  result.push('M');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
};
