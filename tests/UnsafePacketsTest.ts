import "should";

import { getUnsafePacketId, parseUnsafeNmeaSentence } from "../index";

describe("UnsafeParsing", (): void => {
    it("Built in NMEA sentence", (): void => {
        const packet = parseUnsafeNmeaSentence("$GPZDA,160012.71,11,03,2004,-1,00*7D");

        if (packet.sentenceId !== "ZDA") {
            throw Error("sentenceId should be \"ZDA\"");
        }

        packet.localZoneHours.should.equal(-1);
    });

    it("Unknown sentence", (): void => {
        const packet = parseUnsafeNmeaSentence("$GPTXT,01,01,02,ANTSTATUS=OPEN*2B");

        if (packet.sentenceId !== "?") {
            throw Error("sentenceId should be \"?\"");
        }

        packet.dataFields.length.should.equal(4);
        (packet.talkerId === "GP").should.equal(true);
        getUnsafePacketId(packet).should.equal("TXT");
    });

    const BAD_CHECKSUM_SENTENCE = "$IIHDM,201.5,M*21";
    const GOOD_CHECKSUM_SENTENCE = "$IIDBT,036.41,f,011.10,M,005.99,F*25";

    it("checksum", (): void => {
        let packet = parseUnsafeNmeaSentence(BAD_CHECKSUM_SENTENCE);
        (packet.chxOk !== true).should.equal(true);

        packet = parseUnsafeNmeaSentence(GOOD_CHECKSUM_SENTENCE);
        (packet.chxOk === true).should.equal(true);
    });
});
