import "should";

import { parseNmeaSentence } from "../index";


describe("RDID", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$PRDID,-1.31,7.81,47.31*68");

    packet.should.have.property("sentenceId", "RDID");
    packet.should.have.property("sentenceName", "RDI proprietary heading, pitch, and roll");
    packet.should.have.property("talkerId", "P");
    packet.should.have.property("roll", -1.31);
    packet.should.have.property("pitch", 7.81);
    packet.should.have.property("heading", 47.31);
  });

});
