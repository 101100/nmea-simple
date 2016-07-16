var should = require('should');

describe('GSA', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPGSA,A,3,12,05,25,29,,,,,,,,,9.4,7.6,5.6*37");
    msg.should.have.property('sentence', 'GSA');
    msg.should.have.property('type', 'active-satellites');
    msg.should.have.property('selectionMode', 'A');
    msg.should.have.property('mode', 3);
    msg.should.have.property('satellites', [ 12, 5, 25, 29 ]);
    msg.should.have.property('PDOP', 9.4);
    msg.should.have.property('HDOP', 7.6);
    msg.should.have.property('VDOP', 5.6);
  });
});
