import "should";

import { parseNmeaSentence } from "../index";


describe("DTM", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$GNDTM,W84,,0.0,N,0.0,E,0.0,W84*71");

    packet.should.have.property("sentenceId", "DTM");
    packet.should.have.property("sentenceName", "Datum reference");
    packet.should.have.property("talkerId", "GN");
    packet.should.have.property("datumCode", "W84");
    packet.should.have.property("datumSubcode", undefined);
    packet.should.have.property("offsetLatitude", 0);
    packet.should.have.property("offsetLongitude", 0);
    packet.should.have.property("offsetAltitudeMeters", 0);
    packet.should.have.property("datumName", "W84");
  });

});
