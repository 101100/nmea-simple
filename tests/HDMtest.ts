import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("HDM", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIHDM,201.5,M*24");

    packet.should.have.property("sentenceId", "HDM");
    packet.should.have.property("sentenceName", "Heading - magnetic");
    packet.should.have.property("talkerId", "II");
    packet.should.have.property("heading", 201.5);
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "HDM",
      heading: 201.5
    }, "II");

    sentence.should.equal("$IIHDM,201.5,M*24");
  });

});
