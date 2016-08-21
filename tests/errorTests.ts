import "should";

import { encodeNmeaPacket, parseNmeaSentence } from "../index";


describe("encodeNmeaPacket", (): void => {

    it("throws on undefined message", (): void => {
        ((): void => {
            encodeNmeaPacket(<any>undefined);
        }).should.throw("Packet must be given.");
    });

    it("throws on unknown type", (): void => {
        ((): void => {
            encodeNmeaPacket(<any>{ sentenceId: "foo" }, "II");
        }).should.throw("No known encoder for sentence ID \"foo\"");
    });

});

describe("parseNmeaSentence", (): void => {

    it("throws on bad checksum", (): void => {
        ((): void => {
            parseNmeaSentence("$IIHDM,201.5,M*21");
        }).should.throw("Invalid sentence: \"$IIHDM,201.5,M*21\".");
    });

    it("throws on unknown type", (): void => {
        ((): void => {
            parseNmeaSentence("$GPODD,123,456,Y*2A");
        }).should.throw("No known parser for sentence ID \"ODD\".");
    });

});
