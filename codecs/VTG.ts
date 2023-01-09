/*
 * === VTG - Track made good and ground speed ===
 *
 * ------------------------------------------------------------------------------
 *        1     2 3     4 5   6 7   8 9  10
 *        |     | |     | |   | |   | |  |
 * $--VTG,xxx.x,T,xxx.x,M,x.x,N,x.x,K,m,*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Track Degrees
 * 2. T = True
 * 3. Track Degrees
 * 4. M = Magnetic
 * 5. Speed Knots
 * 6. N = Knots
 * 7. Speed Kilometers Per Hour
 * 8. K = Kilometers Per Hour
 * 9. FAA mode indicator (NMEA 2.3 and later)
 * 10. Checksum
 */

import { createNmeaChecksumFooter, encodeDegrees, encodeFixed, parseFloatSafe } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "VTG" = "VTG";
export const sentenceName = "Track made good and ground speed";


export interface VTGPacket extends PacketStub<typeof sentenceId> {
    trackTrue: number;
    trackMagnetic: number;
    speedKnots: number;
    speedKmph?: number;
    faaMode?: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): VTGPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        trackTrue: parseFloatSafe(fields[1]),
        trackMagnetic: parseFloatSafe(fields[3]),
        speedKnots: parseFloatSafe(fields[5]),
        speedKmph: parseFloatSafe(fields[7]),
        faaMode: fields[9]
    };
}


export function encodePacket(packet: VTGPacket, talker: string): string {
    const result = ["$" + talker + sentenceId];

    result.push(encodeDegrees(packet.trackTrue));
    result.push("T");
    result.push(encodeDegrees(packet.trackMagnetic));
    result.push("M");
    result.push(encodeFixed(packet.speedKnots, 2));
    result.push("N");
    if (packet.speedKmph) {
        result.push(encodeFixed(packet.speedKmph, 2));
        result.push("K");
    } else {
        result.push("");
        result.push("");
    }
    if (packet.faaMode) {
        result.push(packet.faaMode);
    }

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);
}
