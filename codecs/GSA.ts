/*
 * === GSA - Active satellites and dilution of precision ===
 *
 * ------------------------------------------------------------------------------
 *         1 2 3  4  5  6  7  8  9  10 11 12 13 14 15  16  17  18
 *         | | |  |  |  |  |  |  |  |  |  |  |  |  |   |   |   |
 *  $--GSA,a,x,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,xx,x.x,x.x,x.x*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Selection of 2D or 3D fix
 *    A - Automatic
 *    M - Manual, forced to operate in 2D or 3D
 * 2. 3D fix
 *    1 - no fix
 *    2 - 2D fix
 *    3 - 3D fix
 * 3. PRN of satellite used for fix (may be blank)
 * ...
 * 14. PRN of satellite used for fix (may be blank)
 * 15. Dilution of precision
 * 16. Horizontal dilution of precision
 * 17. Vertical dilution of precision
 * 18. Checksum
 */

import { parseFloatSafe, parseIntSafe } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "GSA" = "GSA";
export const sentenceName = "Active satellites and dilution of precision";


export type ThreeDFixType = "unknown" | "none" | "2D" | "3D";
const ThreeDFixTypes: ThreeDFixType[] = [ "unknown", "none", "2D", "3D" ];


export interface GSAPacket extends PacketStub<typeof sentenceId> {
    selectionMode: "automatic" | "manual";
    fixMode: ThreeDFixType;
    satellites: number[];
    PDOP: number;
    HDOP: number;
    VDOP: number;
}


export function decodeSentence(stub: PacketStub, fields: string[]): GSAPacket {
    const sats: number[] = [];

    for (let i = 3; i < 15; i++) {
        if (fields[i]) {
            sats.push(+fields[i]);
        }
    }

    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        selectionMode: fields[1] === "A" ? "automatic" : "manual",
        fixMode: ThreeDFixTypes[parseIntSafe(fields[2])],
        satellites: sats,
        PDOP: parseFloatSafe(fields[15]),
        HDOP: parseFloatSafe(fields[16]),
        VDOP: parseFloatSafe(fields[17])
    };
}
