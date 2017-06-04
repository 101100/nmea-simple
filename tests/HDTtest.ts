import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("HDT", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIHDT,234.2,T*25");

    packet.should.have.property("sentenceId", "HDT");
    packet.should.have.property("sentenceName", "Heading - true");
    packet.should.have.property("talkerId", "II");
    packet.should.have.property("heading", 234.2);
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "HDT",
      heading: 234.2
    }, "II");

    sentence.should.equal("$IIHDT,234.2,T*25");
  });

});
