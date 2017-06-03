import "should";

import { parseNmeaSentence } from "../index";


describe("GSV", (): void => {

  it("parses first sentence", (): void => {
    const packet = parseNmeaSentence("$GPGSV,3,1,11,03,03,111,00,04,15,270,00,06,01,010,00,13,06,292,00*74 $GPGSV,3,2,11,14,25,170,00,16,57,208,39,18,67,296,40,19,40,246,00*2D");
    packet.should.have.property("sentenceId", "GSV");
    packet.should.have.property("sentenceName", "Satellites in view");
    packet.should.have.property("talkerId", "GP");
    packet.should.have.property("numberOfMessages", 3);
    packet.should.have.property("messageNumber", 1);
    packet.should.have.property("satellitesInView", 11);
    packet.should.have.property("satellites");

    if (packet.sentenceId !== "GSV") { return; }

    packet.satellites.should.be.instanceof(Array).and.have.lengthOf(4);
    packet.satellites[0].should.deepEqual({
        prnNumber: 3,
        elevationDegrees: 3,
        azimuthTrue: 111,
        SNRdB: 0
    });
    packet.satellites[1].should.deepEqual({
        prnNumber: 4,
        elevationDegrees: 15,
        azimuthTrue: 270,
        SNRdB: 0
    });
    packet.satellites[2].should.deepEqual({
        prnNumber: 6,
        elevationDegrees: 1,
        azimuthTrue: 10,
        SNRdB: 0
    });
    packet.satellites[3].should.deepEqual({
        prnNumber: 13,
        elevationDegrees: 6,
        azimuthTrue: 292,
        SNRdB: 0
    });
  });

  it("parses next sentence", (): void => {
    const packet = parseNmeaSentence("$GPGSV,3,3,11,14,25,170,00,16,57,208,39,18,67,296,40*49");

    packet.should.have.property("sentenceId", "GSV");
    packet.should.have.property("sentenceName", "Satellites in view");
    packet.should.have.property("talkerId", "GP");
    packet.should.have.property("numberOfMessages", 3);
    packet.should.have.property("messageNumber", 3);
    packet.should.have.property("satellitesInView", 11);
    packet.should.have.property("satellites");

    if (packet.sentenceId !== "GSV") { return; }

    packet.satellites.should.be.instanceof(Array).and.have.lengthOf(3);
    packet.satellites[0].should.deepEqual({
        prnNumber: 14,
        elevationDegrees: 25,
        azimuthTrue: 170,
        SNRdB: 0
    });
    packet.satellites[1].should.deepEqual({
        prnNumber: 16,
        elevationDegrees: 57,
        azimuthTrue: 208,
        SNRdB: 39
    });
    packet.satellites[2].should.deepEqual({
        prnNumber: 18,
        elevationDegrees: 67,
        azimuthTrue: 296,
        SNRdB: 40
    });
  });

});
