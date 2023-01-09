import "should";

import { parseDmCoordinate } from "../helpers";

describe("Parse", (): void => {
    it("Coordinate", (): void => {
        parseDmCoordinate("0").should.equal(0);
        parseDmCoordinate("0.0").should.equal(0);
        parseDmCoordinate("30.00").should.equal(0.5);
        parseDmCoordinate("130.00").should.equal(1.5);
        parseDmCoordinate("1030.00").should.equal(10.5);
        parseDmCoordinate("10030.00").should.equal(100.5);
    });
});
