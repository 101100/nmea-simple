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


export const sentenceId: "RDID" = "RDID";
export const sentenceName = "RDI proprietary heading, pitch, and roll";


export interface RDIDPacket {
    sentenceId: "RDID";
    sentenceName?: string;
    talkerId?: string;
    roll: number;
    pitch: number;
    heading: number;
}


export function decodeSentence(fields: string[]): RDIDPacket {
    return {
        sentenceId: sentenceId,
        sentenceName: sentenceName,
        roll: parseFloatSafe(fields[1]),
        pitch: parseFloatSafe(fields[2]),
        heading: parseFloatSafe(fields[3])
    };
}
