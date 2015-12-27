/*
 * === HDT - Heading - True ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3
 *        |   | |
 * $--HDT,x.x,T*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Heading degrees, true
 * 2. T = True
 * 3. Checksum
 */

var helpers = require("../helpers.js")


exports.ID = 'HDT';
exports.TYPE = 'heading-info-true';

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
  result.push('T');
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
};
