var should = require('should');

describe('HDG', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$HCHDG,98.3,0.0,E,12.6,W*57");
    msg.should.have.property('sentence', 'HDG');
    msg.should.have.property('type', 'heading');
    msg.should.have.property('heading', 98.3);
    msg.should.have.property('deviation', 0);
    msg.should.have.property('deviationDirection', 'E');
    msg.should.have.property('variation', 12.6);
    msg.should.have.property('variationDirection', 'W');
  });
});
