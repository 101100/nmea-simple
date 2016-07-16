var should = require('should');

describe('APB', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPAPB,A,A,0.10,R,N,V,V,011,M,DEST,011,M,011,M*3C");
    msg.should.have.property('sentence', 'APB');
    msg.should.have.property('type', 'autopilot-b');
    msg.should.have.property('status1', 'A');
    msg.should.have.property('status2', 'A');
    msg.should.have.property('xteMagn', 0.1);
    msg.should.have.property('steerDir', 'R');
    msg.should.have.property('xteUnit', 'N');
    msg.should.have.property('arrivalCircleStatus', 'V');
    msg.should.have.property('arrivalPerpendicularStatus', 'V');
    msg.should.have.property('bearingOrig2Dest', 11);
    msg.should.have.property('bearingOrig2DestType', 'M');
    msg.should.have.property('waypoint', 'DEST');
    msg.should.have.property('bearing2Dest', 11);
    msg.should.have.property('bearingDestType', 'M');
    msg.should.have.property('heading2steer', 11);
    msg.should.have.property('headingDestType', 'M');
  });
});
