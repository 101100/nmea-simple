/*
 * === GNS - GNSS fix data ===
 *
 * ------------------------------------------------------------------------------
 *                                                        11
 *        1         2       3 4        5 6 7  8   9  10   |    12  13
 *        |         |       | |        | | |  |   |   |   |    |   |
 * $--GNS,hhmmss.ss,llll.ll,N,yyyyy.yy,W,x,xx,x.x,x.x,x.x,null,xxxx*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Time (UTC)
 * 2. Latitude
 * 3. N or S (North or South)
 * 4. Longitude
 * 5. E or W (East or West)
 * 6. Mode Indicator - Variable Length,
 *    N - fix not available,
 *    A - GPS fix,
 *    D - Differential GPS fix
 *    P = PPS fix
 *    R = Real Time Kinematic
 *    F = Float RTK
 *    E = Estimated (dead reckoning)
 *    M = Manual input mode
 *    S = Simulation mode
 * 7. Number of satellites in view, 00 - 12
 * 8. Horizontal Dilution of precision
 * 9. Orthometric height in meters (MSL reference)
 * 10. Geoidal separation in meters - the difference between the earth ellipsoid surface and mean-sea-level (geoid) surface
 *     defined by the reference datum used in the position solution
 * 11. Age of differential data - Null if talker ID is GN, additional GNS messages follow with GP and/or GL Age of differential data
 * 12. Reference station ID1, range 0000-4095
 * 13. Checksum
*/

import { createNmeaChecksumFooter, encodeAltitudeNoUnits, encodeFixed, encodeGeoidalSeperationNoUnits, encodeLatitude, encodeLongitude, encodeTime, encodeValue, parseFloatSafe, parseIntSafe, parseLatitude, parseLongitude, parseTime } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "GNS" = "GNS";
export const sentenceName = "GNSS fix data";

export interface GNSPacket extends PacketStub<typeof sentenceId> {
    time: Date;
    latitude: number;
    longitude: number;
    modeIndicator: string;
    satellitesInView: number;
    horizontalDilution: number;
    altitudeMeters: number;
    geoidalSeperation: number;
    differentialAge?: number;
    differentialRefStn?: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): GNSPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        time: parseTime(fields[1]),
        latitude: parseLatitude(fields[2], fields[3]),
        longitude: parseLongitude(fields[4], fields[5]),
        modeIndicator: fields[6],
        satellitesInView: parseIntSafe(fields[7]),
        horizontalDilution: parseFloatSafe(fields[8]),
        altitudeMeters: parseFloatSafe(fields[9]),
        geoidalSeperation: parseFloatSafe(fields[10]),
        differentialAge: parseFloatSafe(fields[11]),
        differentialRefStn: fields[12]
    };
}


export function encodePacket(packet: GNSPacket, talker: string): string {
    const result = ["$" + talker + sentenceId];

    result.push(encodeTime(packet.time));
    result.push(encodeLatitude(packet.latitude));
    result.push(encodeLongitude(packet.longitude));
    result.push(packet.modeIndicator);
    result.push(encodeValue(packet.satellitesInView));
    result.push(encodeFixed(packet.horizontalDilution, 1));
    result.push(encodeAltitudeNoUnits(packet.altitudeMeters));
    result.push(encodeGeoidalSeperationNoUnits(packet.geoidalSeperation));
    result.push(encodeFixed(packet.differentialAge, 2));
    result.push(encodeValue(packet.differentialRefStn));

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);
}
