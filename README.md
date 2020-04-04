[![NPM version](https://badge.fury.io/js/nmea-simple.svg)](http://badge.fury.io/js/nmea-simple)
[![Travis CI Build Status](https://api.travis-ci.org/101100/nmea-simple.svg)](https://travis-ci.org/101100/nmea-simple)


# NMEA 0183 sentence parser and encoder

This library parses and encodes some NMEA 0183 sentences.  These are typically
used by GPS recievers to send information on position, heading, speed and
acuracy.  The official standard can be found
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


## Acknowledgements

This module was based on the NPM [nmea](https://www.npmjs.com/package/nmea) and
[nmea-0183](https://www.npmjs.com/package/nmea-0183) packages (with date decoding borrowed from [GPS](https://www.npmjs.com/package/gps)) and the
documentation was expanded based on the excellent
[analysis and descriptions](http://catb.org/gpsd/NMEA.html) by Eric S. Raymond.
