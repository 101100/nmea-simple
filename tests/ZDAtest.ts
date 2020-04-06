import "should";

import { parseNmeaSentence } from "../index";

describe("ZDA", (): void => {
    it("parser", (): void => {
        const packet = parseNmeaSentence("$GPZDA,160012.71,11,03,2004,-1,00*7D");
        packet.should.have.property("sentenceId", "ZDA");
        packet.should.have.property("sentenceName", "UTC, day, month, year, and local time zone");
        packet.should.have.property("datetime", new Date("2004-03-11T16:00:12.710Z"));
        packet.should.have.property("localZoneHours", -1);
        packet.should.have.property("localZoneMinutes", 0);
    });
});
