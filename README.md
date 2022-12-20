[![NPM version](https://badge.fury.io/js/nmea-simple.svg)](http://badge.fury.io/js/nmea-simple)
[![Travis CI Build Status](https://api.travis-ci.org/101100/nmea-simple.svg)](https://travis-ci.org/101100/nmea-simple)


# NMEA 0183 sentence parser and encoder

This library parses and encodes some NMEA 0183 sentences.  These are typically
used by GPS receivers to send information on position, heading, speed and
accuracy.  The official standard can be found
[here](http://www.nmea.org/content/nmea_standards/nmea_0183_v_410.asp) and is
described in clear terms [here](http://catb.org/gpsd/NMEA.html).

## Example

Typically, you will get NMEA sentences via the serial port from a GPS module.
You can use the [serialport](https://www.npmjs.com/package/serialport) NPM
package to read the lines (and the `@serialport/parser-readline` parser to
separate the input by `"\r\n"`).  Each line can then be passed into
`parseNmeaSentence` to get the decoded packet.

```js
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline")
const nmea = require("nmea-simple");

const port = new SerialPort(
    "/dev/ttyUSB0",
    {
        baudRate: 9600
    }
);

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

parser.on("data", line => {
    try {
        const packet = nmea.parseNmeaSentence(line);

        if (packet.sentenceId === "RMC" && packet.status === "valid") {
            console.log("Got location via RMC packet:", packet.latitude, packet.longitude);
        }

        if (packet.sentenceId === "GGA" && packet.fixType !== "none") {
            console.log("Got location via GGA packet:", packet.latitude, packet.longitude);
        }

        if (packet.sentenceId === "GSA") {
            console.log("There are " + packet.satellites.length + " satellites in view.");
        }
    } catch (error) {
        console.error("Got bad packet:", line, error);
    }
});
```


## TypeScript

This project is written in [TypeScript](http://www.typescriptlang.org/).  The
library can be used by plain JavaScript as shown above, and the typing
information is also included with the library so that anyone wishing to use
TypeScript will gain the benefits of the type information.


## Packet types supported

The following sentence types can be parsed by this library:

- `APB`
- `BWC`
- `DBT`
- `DTM`
- `GGA`
- `GLL`
- `GNS`
- `GSA`
- `GST`
- `GSV`
- `HDG`
- `HDM`
- `HDT`
- `MTK`
- `MWV`
- `RDID`
- `RMC`
- `VHW`
- `VTG`
- `ZDA`

The following sentence types can be encoded by this library:

- `DBT`
- `GGA`
- `GLL`
- `GNS`
- `HDM`
- `HDT`
- `MTK`
- `MWV`
- `VTG`

This is a fork of the [nmea](https://www.npmjs.com/package/nmea) package with
all dependencies removed and TypeScript typing information added.


## Extending the library

### Custom packets

Custom (proprietary) sentences can be defined with type assurance and added to the parsing algorithm by supplying a custom factory which overrides the `assembleCustomPacket` function of `DefaultPacketFactory` class.


```ts
const logSentenceId: "LOG" = "LOG";

export interface LogPacket extends PacketStub<typeof logSentenceId> {
    logNum: number;
    logMsg: string;
}

class CustomPacketFactory extends DefaultPacketFactory<LogPacket> {
    assembleCustomPacket(stub: PacketStub, fields: string[]): LogPacket | null {
        if (stub.sentenceId === logSentenceId) {
            return {
                ...initStubFields(logSentenceId, stub),
                logNum: parseInt(fields[1], 10),
                logMsg: fields[2]
            };
        }

        return null;
    }
}

export const CUSTOM_PACKET_FACTORY = new CustomPacketFactory();
```

This extends the first example the following way:

```js
    try {
        const packet = nmea.parseGenericPacket(line, CUSTOM_PACKET_FACTORY);

        if (packet.sentenceId === "LOG") {
            console.log("Got a log message:", packet.logMsg);
        }

    ...
```

Make sure not to conflict with built in sentence types!

For more info see **CustomPacketsTest.ts**

### Unsafe packets

It might be desired to investigate packets that are not recognized or have bad checksum. (For example analyzing occurrence frequency.) For this we can use `parseUnsafeNmeaSentence`.

This function will parse every packet, even if the ID is unrecognized. `sentenceId` for these packets are always `?`.

```js
    try {
        const packet = nmea.parseUnsafeNmeaSentence(line);

        if (packet.chxOk !== true) {
            console.log("Skipping packet with bad checksum:");
            return;
        }

        if (packet.sentenceId === "?") {
            console.log("Got an unknown packet with signature:", packet.fields[0]);
        }

    ...
```

## Acknowledgements

This module was based on the NPM [nmea](https://www.npmjs.com/package/nmea) and
[nmea-0183](https://www.npmjs.com/package/nmea-0183) packages (with date decoding borrowed from [GPS](https://www.npmjs.com/package/gps)) and the
documentation was expanded based on the excellent
[analysis and descriptions](http://catb.org/gpsd/NMEA.html) by Eric S. Raymond.
