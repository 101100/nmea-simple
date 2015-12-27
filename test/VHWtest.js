var should = require('should');

describe('VHW', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$IIVHW,245.1,T,245.1,M,000.01,N,000.01,K*55");
    msg.should.have.property('sentence', 'VHW');
    msg.should.have.property('type', 'water-heading-speed');
    msg.should.have.property('degreesTrue', 245.1);
    msg.should.have.property('degreesMagnetic', 245.1);
    msg.should.have.property('speedKnots', 0.01);
    msg.should.have.property('speedKmph', 0.01);
  });
});
