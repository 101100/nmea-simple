import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("MWV", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIMWV,017,R,02.91,N,A*2F");

    packet.should.have.property("sentenceId", "MWV");
    packet.should.have.property("sentenceName", "Wind speed and angle");
    packet.should.have.property("talkerId", "II");
    packet.should.have.property("windAngle", 17);
    packet.should.have.property("reference", "relative");
    packet.should.have.property("speed", 2.91);
    packet.should.have.property("units", "N");
    packet.should.have.property("status", "valid");
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "MWV",
      windAngle: 17,
      reference: "relative",
      speed: 2.91,
      units: "N",
      status: "valid"
    }, "XX");

    sentence.should.equal("$XXMWV,017.00,R,2.91,N,A*31");
  });

});
