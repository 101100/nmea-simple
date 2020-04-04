import "should";

import { parseNmeaSentence } from "../index";

describe("ZDA", (): void => {
    it("parser", (): void => {
        const packet = parseNmeaSentence(
            "$GNZDA,050956.00,30,03,2020,00,00*77"
        );

        packet.should.have.property("sentenceId", "ZDA");
        packet.should.have.property("sentenceName", "Data and Time");
        packet.should.have.property("datetime", new Date("2020-03-30T05:09:56.000Z"));
        packet.should.have.property("localHoursOffset", 0);
        packet.should.have.property("localMinutesOffset", 0);
    });
});
