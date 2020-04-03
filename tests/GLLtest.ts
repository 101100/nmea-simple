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

    const timestamp = new Date();
    timestamp.setUTCHours(9);
    timestamp.setUTCMinutes(56);
    timestamp.setUTCSeconds(1);
    timestamp.setUTCMilliseconds(0);

    packet.should.have.property("time", timestamp);
    packet.should.have.property("status", "valid");
    packet.should.have.property("faaMode", "D");
  });

  it("encoder", (): void => {
    const timestamp = new Date();
    timestamp.setUTCHours(21);
    timestamp.setUTCMinutes(17);
    timestamp.setUTCSeconds(22);
    timestamp.setUTCMilliseconds(0);

    const sentence = encodeNmeaPacket({
      sentenceId: "GLL",
      latitude: 60.084333,
      longitude: 23.539,
      time: timestamp,
      status: "valid",
      faaMode: "D"
    }, "II");

    sentence.should.equal("$IIGLL,6005.059980,N,02332.340000,E,211722,A,D*59");
  });

});
