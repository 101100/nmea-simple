import "should";

import { parseNmeaSentence } from "../index";


describe("HDG", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$HCHDG,98.3,0.0,E,12.6,W*57");

    packet.should.have.property("sentenceId", "HDG");
    packet.should.have.property("sentenceName", "Heading - deviation and variation");
    packet.should.have.property("talkerId", "HC");
    packet.should.have.property("heading", 98.3);
    packet.should.have.property("deviation", 0);
    packet.should.have.property("deviationDirection", "E");
    packet.should.have.property("variation", 12.6);
    packet.should.have.property("variationDirection", "W");
  });

});
