/*
 * === GST - GPS pseudorange noise statistics ===
 *
 * ------------------------------------------------------------------------------
 *        1         2   3   4   5   6   7   8    9
 *        |         |   |   |   |   |   |   |    |
 * $--GST,hhmmss.ss,x.x,x.x,x.x,x.x,x.x,x.x,x.x,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. UTC time of associated GGA fix
 * 2. RMS value of the standard deviation of the range inputs to the navigation
 *    process (range inputs include pseudoranges and DGPS corrections)
 * 3. Standard deviation of semi-major axis of error ellipse, meters
 * 4. Standard deviation of semi-minor axis of error ellipse, meters
 * 5. Orientation of semi-major axis of error ellipse, degrees from true north
 * 6. Standard deviation of latitude error, meters
 * 7. Standard deviation of longitude error, meters
 * 8. Standard deviation of altitude error, meters
 * 9. Checksum
 */

import { parseFloatSafe, parseTime } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "GST" = "GST";
export const sentenceName = "GPS pseudorange noise statistics";


export interface GSTPacket extends PacketStub<typeof sentenceId> {
    time: Date;
    totalRms: number;
    semiMajorError: number;
    semiMinorError: number;
    orientationOfSemiMajorError: number;
    latitudeError: number;
    longitudeError: number;
    altitudeError: number;
}


export function decodeSentence(stub: PacketStub, fields: string[]): GSTPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        time: parseTime(fields[1]),
        totalRms: parseFloatSafe(fields[2]),
        semiMajorError: parseFloatSafe(fields[3]),
        semiMinorError: parseFloatSafe(fields[4]),
        orientationOfSemiMajorError: parseFloatSafe(fields[5]),
        latitudeError: parseFloatSafe(fields[6]),
        longitudeError: parseFloatSafe(fields[7]),
        altitudeError: parseFloatSafe(fields[8])
    };
}
