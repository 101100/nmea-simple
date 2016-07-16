var should = require('should');

describe('HDT', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$IIHDT,234.2,T*25");
    msg.should.have.property('sentence', 'HDT');
    msg.should.have.property('type', 'heading-info-true');
    msg.should.have.property('heading', 234.2);
  });

  it('encodes', function () {
    var nmeaMsg = require("../nmea.js").encode('II', {
      type: 'heading-info-true',
      heading: 234.2
    });
    nmeaMsg.should.equal("$IIHDT,234.2,T*25");
  });
});
