/*
 * === DBT - Depth below transducer ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5   6 7
 *        |   | |   | |   | |
 * $--DBT,x.x,f,x.x,M,x.x,F*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Depth, feet
 * 2. f = feet
 * 3. Depth, meters
 * 4. M = meters
 * 5. Depth, Fathoms
 * 6. F = Fathoms
 * 7. Checksum
 */

import { createNmeaChecksumFooter, encodeFixed, parseFloatSafe } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "DBT" = "DBT";
export const sentenceName = "Depth below transducer";


export interface DBTPacket extends PacketStub<typeof sentenceId> {
    depthFeet: number;
    depthMeters: number;
    depthFathoms: number;
}


export function decodeSentence(stub: PacketStub, fields: string[]): DBTPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        depthFeet: parseFloatSafe(fields[1]),
        depthMeters: parseFloatSafe(fields[3]),
        depthFathoms: parseFloatSafe(fields[5])
    };
}


export function encodePacket(packet: DBTPacket, talker: string): string {
    const result = ["$" + talker + sentenceId];

    result.push(encodeFixed(packet.depthFeet, 2));
    result.push("f");
    result.push(encodeFixed(packet.depthMeters, 2));
    result.push("M");
    result.push(encodeFixed(packet.depthFathoms, 2));
    result.push("F");

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);
}
