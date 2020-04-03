import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("GNS", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$GNGNS,144127.0,4306.925564,N,08930.865195,W,AN,07,1.2,320.2,-37.0,,*52");

    const todayString = new Date().toISOString().substring(0, 10);

    packet.should.have.property("sentenceId", "GNS");
    packet.should.have.property("sentenceName", "GNSS fix data");
    packet.should.have.property("talkerId", "GN");
    packet.should.have.property("time", new Date(todayString + "T14:41:27.000Z")); // Corresponds to time 144127.0 today
    packet.should.have.property("latitude", 43.115426066666664);
    packet.should.have.property("longitude", -89.51441991666667);
    packet.should.have.property("modeIndicator", "AN");
    packet.should.have.property("satellitesInView", 7);
    packet.should.have.property("horizontalDilution", 1.2);
    packet.should.have.property("altitudeMeters", 320.2);
    packet.should.have.property("geoidalSeperation", -37);
  });

  it("encoder", (): void => {
    const sentence = encodeNmeaPacket({
      sentenceId: "GNS",
      time: new Date("2020-01-17T14:41:27.000Z"),
      latitude: 43.115426066666664,
      longitude: -89.51441991666667,
      modeIndicator: "AN",
      satellitesInView: 7,
      horizontalDilution: 1.2,
      altitudeMeters: 320.2,
      geoidalSeperation: -37
    }, "GN");

    sentence.should.equal("$GNGNS,144127,4306.925564,N,08930.865195,W,AN,7,1.2,320.2,-37.0,,*7C");
  });

});
