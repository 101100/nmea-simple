/*
 * === ZDA - Time & Date - UTC, day, month, year and local time zone ===
 *
 * ------------------------------------------------------------------------------
 *	      1         2  3  4    5  6  7
 *        |         |  |  |    |  |  |
 * $--ZDA,hhmmss.ss,dd,mm,yyyy,zz,zz*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time (hours, minutes, seconds, may have fractional subsecond)
 * 2. Day, 01 to 31
 * 3. Month, 01 to 12
 * 4. Year (4 digits)
 * 5. Local zone description, 00 to +- 13 hours
 * 6. Local zone minutes description, 00 to 59, apply same sign as local hours
 * 7. Checksum
 */

import { parseIntSafe, parseTime } from "../helpers";

export const sentenceId: "ZDA" = "ZDA";
export const sentenceName = "UTC, day, month, year, and local time zone";

export interface ZDAPacket {
    sentenceId: "ZDA";
    sentenceName: string;
    talkerId?: string;
    datetime: Date;
    localZoneHours: number;
    localZoneMinutes: number;
}

export function decodeSentence(fields: string[]): ZDAPacket {
    return {
        sentenceId: sentenceId,
        sentenceName: sentenceName,
        datetime: parseTime(fields[1], fields.slice(2, 5).join("")),
        localZoneHours: parseIntSafe(fields[5]),
        localZoneMinutes: parseIntSafe(fields[6])
    };
}
