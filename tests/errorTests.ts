var should = require('should');

var nmea = require("../nmea.js");


describe('nmea', function () {
    describe('encode', function () {
        it('throws on undefined message', function () {
            (function (){
                nmea.encode(undefined);
            }).should.throw("Can not encode undefined, did you forget msg parameter?");
        });

        it('throws on unknown type', function () {
            (function (){
                nmea.encode('II', { type: "foo" });
            }).should.throw("No encoder for type: foo");
        });
    });

    describe('parse', function () {
        it('throws on bad checksum', function () {
            (function (){
                nmea.parse("$IIHDM,201.5,M*21");
            }).should.throw("Invalid line: $IIHDM,201.5,M*21");
        });

        it('throws on unknown type', function () {
            (function (){
                nmea.parse("$GPODD,123,456,Y*2A");
            }).should.throw("Error in parsing: $GPODD,123,456,Y*2A");
        });
    });
});
