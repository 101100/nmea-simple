/*
 * === RMC - Recommended minimum navigation information ===
 *
 * ------------------------------------------------------------------------------
 *                                                              12
 *        1         2 3       4 5        6 7   8   9      10  11|  13
 *        |         | |       | |        | |   |   |      |   | |  |
 * $--RMC,hhmmss.ss,A,llll.ll,a,yyyyy.yy,a,x.x,x.x,ddmmyy,x.x,a,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC Time
 * 2. Status
 *    A = Valid
 *    V = Navigation receiver warning
 * 3. Latitude
 * 4. N or S
 * 5. Longitude
 * 6. E or W
 * 7. Speed over ground, knots
 * 8. Track made good, degrees true
 * 9. Date, ddmmyy
 * 10. Magnetic Variation, degrees
 * 11. E or W
 * 12. FAA mode indicator (NMEA 2.3 and later)
 * 13. Checksum
 */

import { parseDatetime, parseFloatSafe, parseLatitude, parseLongitude } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "RMC" = "RMC";
export const sentenceName = "Recommended minimum navigation information";


export interface RMCPacket extends PacketStub<typeof sentenceId> {
    datetime: Date;
    status: "valid" | "warning";
    latitude: number;
    longitude: number;
    speedKnots: number;
    trackTrue: number;
    variation: number;
    variationPole: "" | "E" | "W";
    faaMode?: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): RMCPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        datetime: parseDatetime(fields[9], fields[1]),
        status: fields[2] === "A" ? "valid" : "warning",
        latitude: parseLatitude(fields[3], fields[4]),
        longitude: parseLongitude(fields[5], fields[6]),
        speedKnots: parseFloatSafe(fields[7]),
        trackTrue: parseFloatSafe(fields[8]),
        variation: parseFloatSafe(fields[10]),
        variationPole: fields[11] === "E" ? "E" : fields[11] === "W" ? "W" : "",
        faaMode: fields[12]
    };
}
