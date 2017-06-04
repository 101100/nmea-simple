import "should";

import { parseNmeaSentence } from "../index";


describe("VHW", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIVHW,245.1,T,245.1,M,000.01,N,000.01,K*55");

    packet.should.have.property("sentenceId", "VHW");
    packet.should.have.property("sentenceName", "Water speed and heading");
    packet.should.have.property("talkerId", "II");
    packet.should.have.property("degreesTrue", 245.1);
    packet.should.have.property("degreesMagnetic", 245.1);
    packet.should.have.property("speedKnots", 0.01);
    packet.should.have.property("speedKmph", 0.01);
  });

});
