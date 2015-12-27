var should = require('should');

describe('BWC', function () {
  it('parses', function () {
    var msg = require("../nmea.js").parse("$GPBWC,220516,5130.02,N,00046.34,W,213.8,T,218.0,M,0004.6,N,EGLM*21");
    msg.should.have.property('sentence', 'BWC');
    msg.should.have.property('type', '2-waypoint');
    msg.should.have.property('time', '220516');
    msg.should.have.property('lat', '5130.02');
    msg.should.have.property('latPole', 'N');
    msg.should.have.property('lon', '00046.34');
    msg.should.have.property('lonPole', 'W');
    msg.should.have.property('bearingTrue', 213.8);
    msg.should.have.property('bearingMag', 218);
    msg.should.have.property('distance', 4.6);
    msg.should.have.property('id', 'EGLM');
  });
});

