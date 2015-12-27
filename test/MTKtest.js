var should = require('should');

describe('MTK', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$PMTK314,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0*28");
    msg.should.have.property('sentence', 'MTK');
    msg.should.have.property('type', 'configuration');
    msg.should.have.property('packetType', 314);
    msg.should.have.property('data', [ '1', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0' ]);
  });

  it('encoding ok', function () {
    var nmeaMsg = require("../nmea.js").encode('P', {
      type: 'configuration',
      packetType: 300,
      data: [ 1000, 0, 0, 0, 0 ]});
    nmeaMsg.should.equal("$PMTK300,1000,0,0,0,0*1C");
  });
});
