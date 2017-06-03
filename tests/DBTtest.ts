import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("DBT", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIDBT,036.41,f,011.10,M,005.99,F*25");

    packet.should.have.property("sentenceId", "DBT");
    packet.should.have.property("sentenceName", "Depth below transducer");
    packet.should.have.property("talkerId", "II");
    packet.should.have.property("depthFeet", 36.41);
    packet.should.have.property("depthMeters", 11.10);
    packet.should.have.property("depthFathoms", 5.99);
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "DBT",
      depthFeet: 36.41,
      depthFathoms: 5.99,
      depthMeters: 11.10
    }, "II");

    sentence.should.equal("$IIDBT,36.41,f,11.10,M,5.99,F*25");
  });

});
