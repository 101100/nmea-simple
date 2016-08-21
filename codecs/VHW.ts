/*
 * === VHW – Water speed and heading ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3   4 5   6 7   8 9
 *        |   | |   | |   | |   | |
 * $--VHW,x.x,T,x.x,M,x.x,N,x.x,K*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Degress True
 * 2. T = True
 * 3. Degrees Magnetic
 * 4. M = Magnetic
 * 5. Knots (speed of vessel relative to the water)
 * 6. N = Knots
 * 7. Kilometers (speed of vessel relative to the water)
 * 8. K = Kilometers
 * 9. Checksum
 */

import { parseFloatSafe } from "../helpers";


export const sentenceId: "VHW" = "VHW";
export const sentenceName = "Water speed and heading";


export interface VHWPacket {
    sentenceId: "VHW";
    sentenceName?: string;
    talkerId?: string;
    degreesTrue: number;
    degreesMagnetic: number;
    speedKnots: number;
    speedKmph: number;
}


export function decodeSentence(fields: string[]): VHWPacket {
    return {
        sentenceId: sentenceId,
        sentenceName: sentenceName,
        degreesTrue: parseFloatSafe(fields[1]),
        degreesMagnetic: parseFloatSafe(fields[3]),
        speedKnots: parseFloatSafe(fields[5]),
        speedKmph: parseFloatSafe(fields[7])
    };
}
