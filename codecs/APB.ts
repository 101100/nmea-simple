/*
 * === APB - Autopilot Sentence "B" ===
 *
 * ------------------------------------------------------------------------------
 *                                         13    15
 *        1 2 3   4 5 6 7 8   9 10   11  12|   14|
 *        | | |   | | | | |   | |    |   | |   | |
 * $--APB,A,A,x.x,a,N,A,A,x.x,a,c--c,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 * 1. Status
 *    V = LORAN-C Blink or SNR warning
 *    V = general warning flag or other navigation systems when a reliable
 *        fix is not available
 * 2. Status
 *    V = Loran-C Cycle Lock warning flag
 *    A = OK or not used
 * 3. Cross Track Error Magnitude
 * 4. Direction to steer, L or R
 * 5. Cross Track Units, N = Nautical Miles
 * 6. Status
 *    A = Arrival Circle Entered
 * 7. Status
 *    A = Perpendicular passed at waypoint
 * 8. Bearing origin to destination
 * 9. M = Magnetic, T = True
 * 10. Destination Waypoint ID
 * 11. Bearing, present position to Destination
 * 12. M = Magnetic, T = True
 * 13. Heading to steer to destination waypoint
 * 14. M = Magnetic, T = True
 * 15. Checksum
 */

import { parseFloatSafe } from "../helpers";
import { initStubFields, PacketStub } from "./PacketStub";


export const sentenceId: "APB" = "APB";
export const sentenceName = "Autopilot sentence \"B\"";


export interface APBPacket extends PacketStub<typeof sentenceId> {
    status1: string;
    status2: string;
    xteMagn: number;
    steerDir: string;
    xteUnit: string;
    arrivalCircleStatus: string;
    arrivalPerpendicularStatus: string;
    bearingOrig2Dest: number;
    bearingOrig2DestType: string;
    waypoint: string;
    bearing2Dest: number;
    bearingDestType: string;
    heading2steer: number;
    headingDestType: string;
}


export function decodeSentence(stub: PacketStub, fields: string[]): APBPacket {
    return {
        ...initStubFields(stub, sentenceId, sentenceName),
        status1: fields[1],
        status2: fields[2],
        xteMagn: parseFloatSafe(fields[3]),
        steerDir: fields[4],
        xteUnit: fields[5],
        arrivalCircleStatus: fields[6],
        arrivalPerpendicularStatus: fields[7],
        bearingOrig2Dest: parseFloatSafe(fields[8]),
        bearingOrig2DestType: fields[9],
        waypoint: fields[10],
        bearing2Dest: parseFloatSafe(fields[11]),
        bearingDestType: fields[12],
        heading2steer: parseFloatSafe(fields[13]),
        headingDestType: fields[14]
    };
}
