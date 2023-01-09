/*
 * === HDG - Heading - deviation and variation ===
 *
 * ------------------------------------------------------------------------------
 *        1   2   3 4   5 6
 *        |   |   | |   | |
 * $--HDG,x.x,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Magnetic Sensor heading in degrees
 * 2. Magnetic Deviation, degrees
 * 3. Magnetic Deviation direction, E = Easterly, W = Westerly
 * 4. Magnetic Variation, degrees
 * 5. Magnetic Variation direction, E = Easterly, W = Westerly
 * 6. Checksum
 */

import { parseFloatSafe } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "HDG" = "HDG";
export const sentenceName = "Heading - deviation and variation";


export interface HDGPacket extends PacketStub<typeof sentenceId> {
    heading: number;
    deviation: number;
    deviationDirection: "" | "E" | "W";
    variation: number;
    variationDirection: "" | "E" | "W";
}


export function decodeSentence(stub: PacketStub, fields: string[]): HDGPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        heading: parseFloatSafe(fields[1]),
        deviation: parseFloatSafe(fields[2]),
        deviationDirection: fields[3] === "E" ? "E" : fields[3] === "W" ? "W" : "",
        variation: parseFloatSafe(fields[4]),
        variationDirection: fields[5] === "E" ? "E" : fields[5] === "W" ? "W" : ""
    };
}
