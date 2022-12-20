/*
 * === GLL - Geographic position - latitude and longitude ===
 *
 * ------------------------------------------------------------------------------
 *         1       2 3        4 5         6 7  8
 *         |       | |        | |         | |  |
 *  $--GLL,llll.ll,a,yyyyy.yy,a,hhmmss.ss,a,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Latitude
 * 2. N or S (North or South)
 * 3. Longitude
 * 4. E or W (East or West)
 * 5. Universal Time Coordinated (UTC)
 * 6. Status
 *    A - Data Valid
 *    V - Data Invalid
 * 7. FAA mode indicator (NMEA 2.3 and later)
 * 8. Checksum
 */

import { createNmeaChecksumFooter, encodeLatitude, encodeLongitude, encodeTime, parseLatitude, parseLongitude, parseTime } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "GLL" = "GLL";
export const sentenceName = "Geographic position - latitude and longitude";


export interface GLLPacket extends PacketStub<typeof sentenceId> {
    latitude: number;
    longitude: number;
    time: Date;
    status: "valid" | "invalid";
    faaMode?: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): GLLPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        latitude: parseLatitude(fields[1], fields[2]),
        longitude: parseLongitude(fields[3], fields[4]),
        time: parseTime(fields[5]),
        status: fields[6] === "A" ? "valid" : "invalid",
        faaMode: fields[7]
    };
}


export function encodePacket(packet: GLLPacket, talker: string): string {
    const result = ["$" + talker + sentenceId];

    result.push(encodeLatitude(packet.latitude));
    result.push(encodeLongitude(packet.longitude));
    result.push(encodeTime(packet.time));
    result.push(packet.status ===  "valid" ? "A" : "V");
    if (packet.faaMode) {
        result.push(packet.faaMode);
    }

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);
}
