/*
 * === GST - UTC day, month, and year, and local time zone offset ===
 *
 * ------------------------------------------------------------------------------
 *        1         2  3  4    5  6   7
 *        |         |  |  |    |  |   |
 * $--GST,hhmmss.ss,dd,mm,yyyy,zz,zz,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time
 * 2. Day, ranging between 01 and 31
 * 3. Month, ranging between 01 and 12
 * 4. Year
 * 5. Local time zone offset from GMT, ranging from 00 through ±13 hours
 * 6. Local time zone offset from GMT, ranging from 00 through 59 minutes
 * 7. Checksum
 */

import { parseTime } from "../helpers";

export const sentenceId: "ZDA" = "ZDA";
export const sentenceName = "Data and Time";

export interface ZDAPacket {
    sentenceId: "ZDA";
    sentenceName: string;
    talkerId?: string;
    datetime: Date;
    localHoursOffset: number;
    localMinutesOffset: number;
}

export function decodeSentence(fields: string[]): ZDAPacket {
    return {
        sentenceId: sentenceId,
        sentenceName: sentenceName,
        datetime: parseTime(fields[1], fields.slice(2, 5).join("")),
        localHoursOffset: parseInt(fields[5], 10),
        localMinutesOffset: parseInt(fields[6], 10)
    };
}
