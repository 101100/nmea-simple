import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("GGA", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$IIGGA,123519,4807.04,N,1131.00,E,1,8,0.9,545.9,M,46.9,M,,*52");

    packet.should.have.property("sentenceId", "GGA");
    packet.should.have.property("sentenceName", "Global positioning system fix data");
    packet.should.have.property("talkerId", "II");

    const timestamp = new Date();
    timestamp.setUTCHours(12);
    timestamp.setUTCMinutes(35);
    timestamp.setUTCSeconds(19);
    timestamp.setUTCMilliseconds(0);

    packet.should.have.property("time", timestamp);
    packet.should.have.property("latitude", 48.117333333333335);
    packet.should.have.property("longitude", 11.516666666666667);
    packet.should.have.property("fixType", "fix");
    packet.should.have.property("satellitesInView", 8);
    packet.should.have.property("horizontalDilution", 0.9);
    packet.should.have.property("altitudeMeters", 545.9);
    packet.should.have.property("geoidalSeperation", 46.9);
  });

  it("encoder", (): void => {
    const timestamp = new Date();
    timestamp.setUTCHours(12);
    timestamp.setUTCMinutes(35);
    timestamp.setUTCSeconds(19);
    timestamp.setUTCMilliseconds(0);

    const sentence = encodeNmeaPacket({
      sentenceId: "GGA",
      time: timestamp,
      latitude: 48.117333,
      longitude: 11.516667,
      fixType: "fix",
      satellitesInView: 8,
      horizontalDilution: 0.9,
      altitudeMeters: 545.9,
      geoidalSeperation: 46.9
    }, "II");

    sentence.should.equal("$IIGGA,123519,4807.039980,N,01131.000020,E,1,8,0.9,545.9,M,46.9,M,,*6F");
  });

});
