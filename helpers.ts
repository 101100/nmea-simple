// Copied from from https://github.com/nherment/node-nmea/blob/master/lib/Helper.js


const m_hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];


export function toHexString(v: number): string {
    const msn = (v >> 4) & 0x0f;
    const lsn = (v >> 0) & 0x0f;

    return m_hex[msn] + m_hex[lsn];
}


export function padLeft(value: string | number, length: number, paddingCharacter: string): string {
    let result = typeof value === "string" ? value : value.toFixed(0);

    while (result.length < length) {
        result = paddingCharacter + result;
    }

    return result;
}



// =========================================
// checksum related functions
// =========================================

/**
 * Checks that the given NMEA sentence has a valid checksum.
 */
export function validNmeaChecksum(nmeaSentence: string): boolean {
    const [sentenceWithoutChecksum, checksumString] = nmeaSentence.split("*");

    const correctChecksum = computeNmeaChecksum(sentenceWithoutChecksum);

    // checksum is a 2 digit hex value
    const actualChecksum = parseInt(checksumString, 16);

    return correctChecksum === actualChecksum;
}


/**
 * Generate a checksum for an NMEA sentence without the trailing "*xx".
 */
export function computeNmeaChecksum(sentenceWithoutChecksum: string): number {
    // init to first character value after the $
    let checksum = sentenceWithoutChecksum.charCodeAt(1);

    // process rest of characters, zero delimited
    for (let i = 2; i < sentenceWithoutChecksum.length; i += 1) {
        checksum = checksum ^ sentenceWithoutChecksum.charCodeAt(i);
    }

    // checksum is between 0x00 and 0xff
    checksum = checksum & 0xff;

    return checksum;
}


/**
 * Generate the correct trailing "*xx" footer for an NMEA sentence.
 */
export function createNmeaChecksumFooter(sentenceWithoutChecksum: string): string {
    return "*" + toHexString(computeNmeaChecksum(sentenceWithoutChecksum));
}


/**
 * Append the correct trailing "*xx" footer for an NMEA string and return the result.
 */
export function appendChecksumFooter(sentenceWithoutChecksum: string): string {
    return sentenceWithoutChecksum + createNmeaChecksumFooter(sentenceWithoutChecksum);
}



// =========================================
// field encoders
// =========================================

export function encodeFixed(value: number | undefined, decimalPlaces: number): string {
    if (value === undefined) {
        return "";
    }

    return value.toFixed(decimalPlaces);
}


/**
 * Encodes the latitude in the standard NMEA format "ddmm.mmmmmm".
 *
 * @param latitude Latitude in decimal degrees.
 */
export function encodeLatitude(latitude?: number): string {
    if (latitude === undefined) {
        return ",";
    }

    let hemisphere: string;
    if (latitude < 0) {
        hemisphere = "S";
        latitude = -latitude;
    } else {
        hemisphere = "N";
    }

    // get integer degrees
    const d = Math.floor(latitude);
    // latitude degrees are always 2 digits
    let s = padLeft(d, 2, "0");

    // get fractional degrees
    const f = latitude - d;
    // convert to fractional minutes
    const m = (f * 60.0);
    // format the fixed point fractional minutes "mm.mmmmmm"
    const t = padLeft(m.toFixed(6), 9, "0");

    s = s + t + "," + hemisphere;
    return s;
}


/**
 * Encodes the longitude in the standard NMEA format "dddmm.mmmmmm".
 *
 * @param longitude Longitude in decimal degrees.
 */
export function encodeLongitude(longitude?: number): string {
    if (longitude === undefined) {
        return ",";
    }

    let hemisphere: string;
    if (longitude < 0) {
        hemisphere = "W";
        longitude = -longitude;
    } else {
        hemisphere = "E";
    }

    // get integer degrees
    const d = Math.floor(longitude);
    // longitude degrees are always 3 digits
    let s = padLeft(d, 3, "0");

    // get fractional degrees
    const f = longitude - d;
    // convert to fractional minutes and round up to the specified precision
    const m = (f * 60.0);
    // format the fixed point fractional minutes "mm.mmmmmm"
    const t = padLeft(m.toFixed(6), 9, "0");

    s = s + t + "," + hemisphere;
    return s;
}


// 1 decimal, always meters
export function encodeAltitude(alt: number): string {
    if (alt === undefined) {
        return ",";
    }

    return alt.toFixed(1) + ",M";
}

// Some encodings don't want the unit
export function encodeAltitudeNoUnits(alt: number): string {
    if (alt === undefined) {
        return "";
    }

    return alt.toFixed(1);
}


// 1 decimal, always meters
export function encodeGeoidalSeperation(geoidalSep: number): string {
    if (geoidalSep === undefined) {
        return ",";
    }

    return geoidalSep.toFixed(1) + ",M";
}

// Some encodings don't want the unit
export function encodeGeoidalSeperationNoUnits(geoidalSep: number): string {
    if (geoidalSep === undefined) {
        return "";
    }

    return geoidalSep.toFixed(1);
}


// degrees
export function encodeDegrees(degrees?: number): string {
    if (degrees === undefined) {
        return "";
    }

    return padLeft(degrees.toFixed(2), 6, "0");
}


export function encodeDate(date?: Date): string {
    if (date === undefined) {
        return "";
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    return padLeft(day, 2, "0") + padLeft(month, 2, "0") + year.toFixed(0).substr(2);
}


export function encodeTime(date?: Date): string {
    if (date === undefined) {
        return "";
    }

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return padLeft(hours, 2, "0") + padLeft(minutes, 2, "0") + padLeft(seconds, 2, "0");
}


export function encodeValue(value?: any): string {
    if (value === undefined) {
        return "";
    }

    return value.toString();
}



// =========================================
// field traditionalDecoders
// =========================================

/**
 * Parse the given string to a float, returning 0 for an empty string.
 */
export function parseFloatSafe(str: string): number {
    if (str === "") {
        return 0.0;
    }
    return parseFloat(str);
}


/**
 * Parse the given string to a integer, returning 0 for an empty string.
 */
export function parseIntSafe(i: string): number {
    if (i === "") {
        return 0;
    }

    return parseInt(i, 10);
}


/**
 * Parse the given string to a float if possible, returning 0 for an undefined
 * value and a string the the given string cannot be parsed.
 */
export function parseNumberOrString(str?: string): number | string {
    if (str === undefined) {
        return "";
    }

    const num = parseFloat(str);

    return num === NaN ? str : num;
}


/**
 * Parses coordinate given as "dddmm.mm", "ddmm.mm", "dmm.mm" or "mm.mm"
 */
export function parseDmCoordinate(coordinate: string): number {

    const dotIdx = coordinate.indexOf(".");

    if (dotIdx < 0) {
        return 0;
    }

    let degrees: string;
    let minutes: string;

    if (dotIdx >= 3) {
        degrees = coordinate.substring(0, dotIdx - 2);
        minutes = coordinate.substring(dotIdx - 2);
    } else {
        // no degrees, just minutes (nonstandard but a buggy unit might do this)
        degrees = "0";
        minutes = coordinate;
    }

    return (parseFloat(degrees) + (parseFloat(minutes) / 60.0));
}

/**
 * Parses latitude given as "ddmm.mm", "dmm.mm" or "mm.mm" (assuming zero
 * degrees) along with a given hemisphere of "N" or "S" into decimal degrees,
 * where north is positive and south is negative.
 */
export function parseLatitude(lat: string, hemi: string): number {
    const hemisphere = (hemi === "N") ? 1.0 : -1.0;

    return parseDmCoordinate(lat) * hemisphere;
}


/**
 * Parses latitude given as "dddmm.mm", "ddmm.mm", "dmm.mm" or "mm.mm" (assuming
 * zero degrees) along with a given hemisphere of "E" or "W" into decimal
 * degrees, where east is positive and west is negative.
 */
export function parseLongitude(lon: string, hemi: string): number {
    const hemisphere = (hemi === "E") ? 1.0 : -1.0;

    return parseDmCoordinate(lon) * hemisphere;
}

/**
 * Parses a UTC time and optionally a date and returns a Date
 * object.
 * @param {String} time Time the format "hhmmss" or "hhmmss.ss"
 * @param {String=} date Optional date in format the ddmmyyyy or ddmmyy
 * @returns {Date}
 */
export function parseTime(time: string, date?: string): Date {

    if (time === "") {
        return new Date(0);
    }

    const ret = new Date();

    if (date) {

        const year = date.slice(4);
        const month = parseInt(date.slice(2, 4), 10) - 1;
        const day = date.slice(0, 2);

        if (year.length === 4) {
            ret.setUTCFullYear(Number(year), Number(month), Number(day));
        } else {
            // If we need to parse older GPRMC data, we should hack something like
            // year < 73 ? 2000+year : 1900+year
            // Since GPS appeared in 1973
            ret.setUTCFullYear(Number("20" + year), Number(month), Number(day));
        }
    }

    ret.setUTCHours(Number(time.slice(0, 2)));
    ret.setUTCMinutes(Number(time.slice(2, 4)));
    ret.setUTCSeconds(Number(time.slice(4, 6)));

    // Extract the milliseconds, since they can be not present, be 3 decimal place, or 2 decimal places, or other?
    const msStr = time.slice(7);
    const msExp = msStr.length;
    let ms = 0;
    if (msExp !== 0) {
        ms = parseFloat(msStr) * Math.pow(10, 3 - msExp);
    }
    ret.setUTCMilliseconds(Number(ms));

    return ret;
}


/**
 * Parses a date in the format "yyMMdd" along with a time in the format
 * "hhmmss" or "hhmmss.ss" and returns a Date object.
 */
export function parseDatetime(date: string, time: string): Date {
    const day = parseInt(date.slice(0, 2), 10);
    const month = parseInt(date.slice(2, 4), 10);
    let year = parseInt(date.slice(4, 6), 10);
    // GPRMC date doesn't specify century. GPS came out in 1973 so if the year
    // is less than 73, assume it's 20xx, otherwise assume it is 19xx.
    if (year < 73) {
        year = year + 2000;
    }
    else {
        year = year + 1900;
    }

    const hours = parseInt(time.slice(0, 2), 10);
    const minutes = parseInt(time.slice(2, 4), 10);
    const seconds = parseInt(time.slice(4, 6), 10);
    let milliseconds = 0;
    if (time.length === 9) {
        milliseconds = parseInt(time.slice(7, 9), 10) * 10;
    }

    return new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
}
