import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("GGA", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIGGA,123519,4807.04,N,1131.00,E,1,8,0.9,545.9,M,46.9,M,,*52");

    packet.should.have.property("sentenceId", "GGA");
    packet.should.have.property("sentenceName", "Global positioning system fix data");
    packet.should.have.property("talkerId", "II");
    packet.should.have.property("time", new Date("1899-12-31T12:35:19Z")); // 1899-12-31 is the date when year month and day are zero
    packet.should.have.property("latitude", 48.117333333333335);
    packet.should.have.property("longitude", 11.516666666666667);
    packet.should.have.property("fixType", "fix");
    packet.should.have.property("satellitesInView", 8);
    packet.should.have.property("horizontalDilution", 0.9);
    packet.should.have.property("altitudeMeters", 545.9);
    packet.should.have.property("geoidalSeperation", 46.9);
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "GGA",
      time: new Date("2013-01-01T12:35:19Z"),
      latitude: 48.117333,
      longitude: 11.516667,
      fixType: "fix",
      satellitesInView: 8,
      horizontalDilution: 0.9,
      altitudeMeters: 545.9,
      geoidalSeperation: 46.9
    }, "II");

    sentence.should.equal("$IIGGA,123519,4807.04,N,01131.00,E,1,8,0.9,545.9,M,46.9,M,,*62");
  });

});
