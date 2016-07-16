var should = require('should');

describe('GSV', function () {
  it('parses first sentence', function () {
    var msg = require("../nmea.js").parse("$GPGSV,3,1,11,03,03,111,00,04,15,270,00,06,01,010,00,13,06,292,00*74 $GPGSV,3,2,11,14,25,170,00,16,57,208,39,18,67,296,40,19,40,246,00*2D");
    msg.should.have.property('sentence', 'GSV');
    msg.should.have.property('type', 'satellite-list-partial');
    msg.should.have.property('numMsgs', 3);
    msg.should.have.property('msgNum', 1);
    msg.should.have.property('satsInView', 11);
    msg.should.have.property('satellites')
    msg.satellites.should.be.instanceof(Array).and.have.lengthOf(4);
    msg.satellites[0].should.deepEqual({
        id: 3,
        elevationDeg: 3,
        azimuthTrue: 111,
        SNRdB: 0
    });
    msg.satellites[1].should.deepEqual({
        id: 4,
        elevationDeg: 15,
        azimuthTrue: 270,
        SNRdB: 0
    });
    msg.satellites[2].should.deepEqual({
        id: 6,
        elevationDeg: 1,
        azimuthTrue: 10,
        SNRdB: 0
    });
    msg.satellites[3].should.deepEqual({
        id: 13,
        elevationDeg: 6,
        azimuthTrue: 292,
        SNRdB: 0
    });
  });

  it('parses next sentence', function () {
    var msg = require("../nmea.js").parse("$GPGSV,3,3,11,14,25,170,00,16,57,208,39,18,67,296,40*49");
    msg.should.have.property('sentence', 'GSV');
    msg.should.have.property('type', 'satellite-list-partial');
    msg.should.have.property('numMsgs', 3);
    msg.should.have.property('msgNum', 3);
    msg.should.have.property('satsInView', 11);
    msg.should.have.property('satellites')
    msg.satellites.should.be.instanceof(Array).and.have.lengthOf(3);
    msg.satellites[0].should.deepEqual({
        id: 14,
        elevationDeg: 25,
        azimuthTrue: 170,
        SNRdB: 0
    });
    msg.satellites[1].should.deepEqual({
        id: 16,
        elevationDeg: 57,
        azimuthTrue: 208,
        SNRdB: 39
    });
    msg.satellites[2].should.deepEqual({
        id: 18,
        elevationDeg: 67,
        azimuthTrue: 296,
        SNRdB: 40
    });
  });
});
