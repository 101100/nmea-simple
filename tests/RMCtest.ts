var should = require('should');

describe('RMC', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A");
    msg.should.have.property('sentence', 'RMC');
    msg.should.have.property('type', 'nav-info');
    msg.should.have.property('timestamp', '123519');
    msg.should.have.property('status', 'valid');
    msg.should.have.property('lat', '4807.038');
    msg.should.have.property('latPole', 'N');
    msg.should.have.property('lon', '01131.000');
    msg.should.have.property('lonPole', 'E');
    msg.should.have.property('speedKnots', 22.4);
    msg.should.have.property('trackTrue', 84.4);
    msg.should.have.property('date', '230394');
    msg.should.have.property('variation', 3.1);
    msg.should.have.property('variationPole', 'W');
  });
});
