/*
 * === MTK - Configuration packet ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 ... n n+1
 *        |   |     | |
 * $--MTKxxx,a,...,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Packet type (000-999)
 * 2. - n. Data fields; meaning and quantity vary depending on the packet type
 * n+1. Checksum
 */

var helpers = require("../helpers.js")


exports.ID = 'MTK';
exports.TYPE = 'configuration';

exports.decode = function (fields) {
  return {
    sentence: exports.ID,
    type: exports.TYPE,
    packetType: +fields[0].substr(3),
    data: fields.slice(1)
  }
};

exports.encode = function (talker, msg) {
  var result = ['$' + talker + exports.ID + helpers.padLeft(msg.packetType, 3, '0')];
  result = result.concat(msg.data);
  var resultMsg = result.join(',');
  return resultMsg + helpers.computeChecksum(resultMsg);
};
