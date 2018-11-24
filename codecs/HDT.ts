/*
 * === HDT - Heading - true ===
 *
 * ------------------------------------------------------------------------------
 *        1   2 3
 *        |   | |
 * $--HDT,x.x,T*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Heading degrees, true
 * 2. T = True
 * 3. Checksum
 */


import { createNmeaChecksumFooter, encodeFixed, parseFloatSafe } from "../helpers";


export const sentenceId: "HDT" = "HDT";
export const sentenceName = "Heading - true";


export interface HDTPacket {
    sentenceId: "HDT";
    sentenceName?: string;
    talkerId?: string;
    heading: number;
}


export function decodeSentence(fields: string[]): HDTPacket {
    return {
        sentenceId: sentenceId,
        sentenceName: sentenceName,
        heading: parseFloatSafe(fields[1])
    };
}


export function encodePacket(packet: HDTPacket, talker: string): string {
    const result = ["$" + talker + sentenceId];

    result.push(encodeFixed(packet.heading, 1));
    result.push("T");

    const resultWithoutChecksum = result.join(",");
    return resultWithoutChecksum + createNmeaChecksumFooter(resultWithoutChecksum);
}
