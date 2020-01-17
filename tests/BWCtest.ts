import "should";

import { parseNmeaSentence } from "../index";


describe("BWC", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$GPBWC,220516,5130.02,N,00046.34,W,213.8,T,218.0,M,0004.6,N,EGLM*21");

    packet.should.have.property("sentenceId", "BWC");
    packet.should.have.property("sentenceName", "Bearing and distance to waypoint - great circle");
    packet.should.have.property("talkerId", "GP");

    const timestamp = new Date();
    timestamp.setUTCHours(22);
    timestamp.setUTCMinutes(5);
    timestamp.setUTCSeconds(16);
    timestamp.setUTCMilliseconds(0);

    packet.should.have.property("time", timestamp);
    packet.should.have.property("bearingLatitude", 51.50033333333333);
    packet.should.have.property("bearingLongitude", -0.7723333333333334);
    packet.should.have.property("bearingTrue", 213.8);
    packet.should.have.property("bearingMagnetic", 218);
    packet.should.have.property("distanceNm", 4.6);
    packet.should.have.property("waypointId", "EGLM");
  });

});
