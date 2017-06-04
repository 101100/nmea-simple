import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("MTK", (): void => {

  it("parser", (): void => {
    const packet = parseNmeaSentence("$PMTK314,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0*28");

    packet.should.have.property("sentenceId", "MTK");
    packet.should.have.property("sentenceName", "Configuration packet");
    packet.should.have.property("talkerId", "P");
    packet.should.have.property("packetType", 314);
    packet.should.have.property("data", [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
  });

  describe("encoder", () => {

    it("works with numeric data", (): void => {
        const sentence = encodeNmeaPacket({
        sentenceId: "MTK",
        packetType: 300,
        data: [ 1000, 0, 0, 0, 0 ]
        }, "P");

        sentence.should.equal("$PMTK300,1000,0,0,0,0*1C");
    });

    it("works with string data", (): void => {
        const sentence = encodeNmeaPacket({
        sentenceId: "MTK",
        packetType: 300,
        data: [ "1000", "0", "0", "0", "0" ]
        });

        sentence.should.equal("$PMTK300,1000,0,0,0,0*1C");
    });

  });

});
