import "should";

import { parseNmeaSentence } from "../index";


describe("APB", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$GPAPB,A,A,0.10,R,N,V,V,011,M,DEST,011,M,011,M*3C");

    packet.should.have.property("sentenceId", "APB");
    packet.should.have.property("sentenceName", "Autopilot sentence \"B\"");
    packet.should.have.property("talkerId", "GP");
    packet.should.have.property("status1", "A");
    packet.should.have.property("status2", "A");
    packet.should.have.property("xteMagn", 0.1);
    packet.should.have.property("steerDir", "R");
    packet.should.have.property("xteUnit", "N");
    packet.should.have.property("arrivalCircleStatus", "V");
    packet.should.have.property("arrivalPerpendicularStatus", "V");
    packet.should.have.property("bearingOrig2Dest", 11);
    packet.should.have.property("bearingOrig2DestType", "M");
    packet.should.have.property("waypoint", "DEST");
    packet.should.have.property("bearing2Dest", 11);
    packet.should.have.property("bearingDestType", "M");
    packet.should.have.property("heading2steer", 11);
    packet.should.have.property("headingDestType", "M");
  });

});
