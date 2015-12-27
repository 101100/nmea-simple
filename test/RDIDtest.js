var should = require('should');

describe('RDID', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$PRDID,-1.31,7.81,47.31*68");
    msg.should.have.property('sentence', 'RDID');
    msg.should.have.property('type', 'gyro');
    msg.should.have.property('roll', -1.31);
    msg.should.have.property('pitch', 7.81);
    msg.should.have.property('heading', 47.31);
  });
});
