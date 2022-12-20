/*
 * === BWC - Bearing and distance to waypoint - great circle ===
 *
 * ------------------------------------------------------------------------------
 *                                                         12
 *        1         2       3 4        5 6   7 8   9 10  11|    13 14
 *        |         |       | |        | |   | |   | |   | |    |  |
 * $--BEC,hhmmss.ss,llll.ll,a,yyyyy.yy,a,x.x,T,x.x,M,x.x,N,c--c,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time
 * 2. Waypoint Latitude
 * 3. N = North, S = South
 * 4. Waypoint Longitude
 * 5. E = East, W = West
 * 6. Bearing, True
 * 7. T = True
 * 8. Bearing, Magnetic
 * 9. M = Magnetic
 * 10. Nautical Miles
 * 11. N = Nautical Miles
 * 12. Waypoint ID
 * 13. FAA mode indicator (NMEA 2.3 and later, optional)
 * 14. Checksum
 */


import { parseFloatSafe, parseLatitude, parseLongitude, parseTime } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "BWC" = "BWC";
export const sentenceName = "Bearing and distance to waypoint - great circle";


export interface BWCPacket extends PacketStub<typeof sentenceId> {
    time: Date;
    bearingLatitude: number;
    bearingLongitude: number;
    bearingTrue: number;
    bearingMagnetic: number;
    distanceNm: number;
    waypointId: string;
    faaMode?: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): BWCPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        time: parseTime(fields[1]),
        bearingLatitude: parseLatitude(fields[2], fields[3]),
        bearingLongitude: parseLongitude(fields[4], fields[5]),
        bearingTrue: parseFloatSafe(fields[6]),
        bearingMagnetic: parseFloatSafe(fields[8]),
        distanceNm: parseFloatSafe(fields[10]),
        waypointId: fields[12],
        faaMode: fields[13]
    };
}
