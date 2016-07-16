[![NPM version](https://badge.fury.io/js/nmea-simple.svg)](http://badge.fury.io/js/nmea-simple)
[![Travis CI Build Status](https://api.travis-ci.org/101100/nmea-simple.svg)](https://travis-ci.org/101100/nmea-simple)


# NMEA 0183 sentence parser and encoder

This library parses and encodes some NMEA 0183 sentences.  These are typically
used by GPS recievers to send information on position, heading, speed and
acuracy.  The standard can be found
[here](http://www.nmea.org/content/nmea_standards/nmea_0183_v_410.asp) and is
described in clear terms [here](http://www.gpsinformation.org/dale/nmea.htm).

The following sentence types can be parsed by this library:

- `APB`
- `BWC`
- `DBT`
- `GGA`
- `GLL`
- `GSA`
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

The following sentence types can be encoded by this library:

- `DBT`
- `GGA`
- `GLL`
- `HDM`
- `HDT`
- `MTK`
- `MWV`
- `VTG`

This is a fork of the [nmea](https://www.npmjs.com/package/nmea) package with
all dependencies removed and TypeScript typing information added.


## Example

The sentences can be read from the serial port using the NPM
[serialport](https://www.npmjs.com/package/serialport) package.

```js
var serialport = require('serialport');
var nmea = require('nmea-simple');

var port = new serialport.SerialPort(
    '/dev/cu.usbserial',
    {
        baudrate: 4800,
        parser: serialport.parsers.readline('\r\n')
    }
);

port.on('data', function(line) {
    try {
        console.log(nmea.parseNmeaSentence(line));
    } catch (error) {
        console.error("Got bad packet:", line, err);
    }
});
```


## TypeScript

This project is written in [TypeScript](http://www.typescriptlang.org/).  The
library can be used by plain JavaScript as shown above, and the typing
information is also included with the library so that anyone wishing to use
TypeScript will gain the benefits of the type information.


## Acknowledgements

This module was based on the NPM [nmea](https://www.npmjs.com/package/nmea) and
[nmea-0183](https://www.npmjs.com/package/nmea-0183) packages.
