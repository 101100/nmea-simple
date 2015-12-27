var should = require('should');

describe('HDM', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$IIHDM,201.5,M*24");
    msg.should.have.property('sentence', 'HDM');
    msg.should.have.property('type', 'heading-info-magnetic');
    msg.should.have.property('heading', 201.5);
  });

  it('encodes ok', function () {
    var nmeaMsg = require("../nmea.js").encode('II', {
      type: 'heading-info-magnetic',
      heading: 201.5
    });
    nmeaMsg.should.equal("$IIHDM,201.5,M*24");
  });
});
