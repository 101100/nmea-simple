/*
 * === PRDID - RDI proprietary heading, pitch, and roll ===
 *
 * ------------------------------------------------------------------------------
 *        1   2   3   4
 *        |   |   |   |
 * $PRDID,x.x,x.x,x.x*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Roll
 * 2. Pitch
 * 3. Heading
 * 4. Checksum
 */

import { parseFloatSafe } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "RDID" = "RDID";
export const sentenceName = "RDI proprietary heading, pitch, and roll";


export interface RDIDPacket extends PacketStub<typeof sentenceId> {
    roll: number;
    pitch: number;
    heading: number;
}


export function decodeSentence(stub: PacketStub, fields: string[]): RDIDPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        roll: parseFloatSafe(fields[1]),
        pitch: parseFloatSafe(fields[2]),
        heading: parseFloatSafe(fields[3])
    };
}
