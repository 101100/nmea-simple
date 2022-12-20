/*
 * === GGA - Global positioning system fix data ===
 *
 * ------------------------------------------------------------------------------
 *                                                      11
 *        1         2       3 4        5 6 7  8   9  10 |  12 13  14   15
 *        |         |       | |        | | |  |   |   | |   | |   |    |
 * $--GGA,hhmmss.ss,llll.ll,a,yyyyy.yy,a,x,xx,x.x,x.x,M,x.x,M,x.x,xxxx*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Time (UTC)
 * 2. Latitude
 * 3. N or S (North or South)
 * 4. Longitude
 * 5. E or W (East or West)
 * 6. GPS Quality Indicator,
 *    0 - fix not available,
 *    1 - GPS fix,
 *    2 - Differential GPS fix
 *    3 = PPS fix
 *    4 = Real Time Kinematic
 *    5 = Float RTK
 *    6 = Estimated (dead reckoning)
 *    7 = Manual input mode
 *    8 = Simulation mode
 * 7. Number of satellites in view, 00 - 12
 * 8. Horizontal Dilution of precision
 * 9. Antenna Altitude above/below mean-sea-level (geoid)
 * 10. Units of antenna altitude, meters
 * 11. Geoidal separation, the difference between the WGS-84 earth
 *     ellipsoid and mean-sea-level (geoid), "-" means mean-sea-level below ellipsoid
 * 12. Units of geoidal separation, meters
 * 13. Age of differential GPS data, time in seconds since last SC104
 *     type 1 or 9 update, null field when DGPS is not used
 * 14. Differential reference station ID, 0000-1023
 * 15. Checksum
*/

import { createNmeaChecksumFooter, encodeAltitude, encodeFixed, encodeGeoidalSeperation, encodeLatitude, encodeLongitude, encodeTime, encodeValue, parseFloatSafe, parseIntSafe, parseLatitude, parseLongitude, parseTime } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "GGA" = "GGA";
export const sentenceName = "Global positioning system fix data";


export type FixType = "none" | "fix" | "delta" | "pps" | "rtk" | "frtk" | "estimated" | "manual" | "simulation";
const FixTypes: FixType[] = [ "none", "fix", "delta", "pps", "rtk", "frtk", "estimated", "manual", "simulation" ];


export interface GGAPacket extends PacketStub<typeof sentenceId> {
    time: Date;
    latitude: number;
    longitude: number;
    fixType: FixType;
    satellitesInView: number;
    horizontalDilution: number;
    altitudeMeters: number;
    geoidalSeperation: number;
    differentialAge?: number;
    differentialRefStn?: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): GGAPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        time: parseTime(fields[1]),
        latitude: parseLatitude(fields[2], fields[3]),
        longitude: parseLongitude(fields[4], fields[5]),
        fixType: FixTypes[parseIntSafe(fields[6])],
        satellitesInView: parseIntSafe(fields[7]),
        horizontalDilution: parseFloatSafe(fields[8]),
        altitudeMeters: parseFloatSafe(fields[9]),
        geoidalSeperation: parseFloatSafe(fields[11]),
        differentialAge: parseFloatSafe(fields[13]),
        differentialRefStn: fields[14]
    };
}


export function encodePacket(packet: GGAPacket, talker: string): string {
    const result = ["$" + talker + sentenceId];

    result.push(encodeTime(packet.time));
    result.push(encodeLatitude(packet.latitude));
    result.push(encodeLongitude(packet.longitude));
    result.push(encodeValue(FixTypes.indexOf(packet.fixType)));
    result.push(encodeValue(packet.satellitesInView));
    result.push(encodeFixed(packet.horizontalDilution, 1));
    result.push(encodeAltitude(packet.altitudeMeters));
    result.push(encodeGeoidalSeperation(packet.geoidalSeperation));
    result.push(encodeFixed(packet.differentialAge, 2));
    result.push(encodeValue(packet.differentialRefStn));

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);
}
