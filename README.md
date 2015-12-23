# NMEA 0183 sentence parser and encoder

This library parses some NMEA 0183 sentences.  These are typically used by GPS
recievers to send information on position, heading, speed and acuracy.  The
standard can be found
[here](http://www.nmea.org/content/nmea_standards/nmea_0183_v_410.asp) and is
described in clear terms [here](http://www.gpsinformation.org/dale/nmea.htm).

This is a fork of the [nmea](https://www.npmjs.com/package/nmea) package with
all dependencies removed.

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
	    console.log(nmea.parse(line));
	} catch (error) {
		console.error("Got bad packet:", line, err);
	}
});
```

## Acknowledgements

This module was based on the NPM [nmea](https://www.npmjs.com/package/nmea) and
[nmea-0183](https://www.npmjs.com/package/nmea-0183) packages.
