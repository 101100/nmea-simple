import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("GLL", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$GPGLL,6005.068,N,02332.341,E,095601,A,D*42");

    packet.should.have.property("sentenceId", "GLL");
    packet.should.have.property("sentenceName", "Geographic position - latitude and longitude");
    packet.should.have.property("talkerId", "GP");
    packet.should.have.property("latitude", 60.084466666666664);
    packet.should.have.property("longitude", 23.539016666666665);
    packet.should.have.property("time", new Date(Date.UTC(0, 0, 0, 9, 56, 1)));
    packet.should.have.property("status", "valid");
    packet.should.have.property("faaMode", "D");
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "GLL",
      latitude: 60.084333,
      longitude: 23.539,
      time: new Date(Date.UTC(2013, 4, 1, 21, 17, 22)),
      status: "valid",
      faaMode: "D"
    }, "II");

    sentence.should.equal("$IIGLL,6005.06,N,02332.34,E,211722,A,D*52");
  });

});
