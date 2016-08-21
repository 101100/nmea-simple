import { decodeSentence as decodeAPB, APBPacket } from "./codecs/APB";
import { decodeSentence as decodeBWC, BWCPacket } from "./codecs/BWC";
import { decodeSentence as decodeDBT, DBTPacket, encodePacket as encodeDBT } from "./codecs/DBT";
import { decodeSentence as decodeGGA, GGAPacket, encodePacket as encodeGGA } from "./codecs/GGA";
import { decodeSentence as decodeGLL, GLLPacket, encodePacket as encodeGLL } from "./codecs/GLL";
import { decodeSentence as decodeGSA, GSAPacket } from "./codecs/GSA";
import { decodeSentence as decodeGSV, GSVPacket } from "./codecs/GSV";
import { decodeSentence as decodeHDG, HDGPacket } from "./codecs/HDG";
import { decodeSentence as decodeHDM, HDMPacket, encodePacket as encodeHDM } from "./codecs/HDM";
import { decodeSentence as decodeHDT, HDTPacket, encodePacket as encodeHDT } from "./codecs/HDT";
import { decodeSentence as decodeMTK, MTKPacket, encodePacket as encodeMTK } from "./codecs/MTK";
import { decodeSentence as decodeMWV, MWVPacket, encodePacket as encodeMWV } from "./codecs/MWV";
import { decodeSentence as decodeRDID, RDIDPacket } from "./codecs/RDID";
import { decodeSentence as decodeRMC, RMCPacket } from "./codecs/RMC";
import { decodeSentence as decodeVHW, VHWPacket } from "./codecs/VHW";
import { decodeSentence as decodeVTG, VTGPacket, encodePacket as encodeVTG } from "./codecs/VTG";

import { validNmeaChecksum } from "./helpers";


export type Packet = APBPacket | BWCPacket | DBTPacket | GGAPacket | GLLPacket | GSAPacket | GSVPacket | HDGPacket | HDMPacket | HDTPacket | MTKPacket | MWVPacket | RDIDPacket | RMCPacket | VHWPacket | VTGPacket;
export { APBPacket, BWCPacket, DBTPacket, GGAPacket, GLLPacket, GSAPacket, GSVPacket, HDGPacket, HDMPacket, HDTPacket, MTKPacket, MWVPacket, RDIDPacket, RMCPacket, VHWPacket, VTGPacket };


type Decoder = (parts: string[]) => Packet;


const decoders: { [sentenceId: string]: Decoder } = {
    APB: decodeAPB,
    BWC: decodeBWC,
    DBT: decodeDBT,
    GGA: decodeGGA,
    GLL: decodeGLL,
    GSA: decodeGSA,
    GSV: decodeGSV,
    HDG: decodeHDG,
    HDM: decodeHDM,
    HDT: decodeHDT,
    MTK: decodeMTK,
    MWV: decodeMWV,
    RDID: decodeRDID,
    RMC: decodeRMC,
    VHW: decodeVHW,
    VTG: decodeVTG
};


type Encoder = (packet: Packet, talker: string) => string;


const encoders: { [sentenceId: string]: Encoder } = {
    DBT: encodeDBT,
    GGA: encodeGGA,
    GLL: encodeGLL,
    HDM: encodeHDM,
    HDT: encodeHDT,
    MTK: encodeMTK,
    MWV: encodeMWV,
    VTG: encodeVTG
};


export function parseNmeaSentence(sentence: string): Packet {
    if (!validNmeaChecksum(sentence)) {
        throw Error(`Invalid sentence: "${sentence}".`);
    }

    const fields = sentence.split("*")[0].split(",");

    let talkerId: string;
    let sentenceId: string;
    if (fields[0].charAt(1) === "P") {
        talkerId = "P"; // Proprietary
        sentenceId = fields[0].substr(2);
    } else {
        talkerId = fields[0].substr(1, 2);
        sentenceId = fields[0].substr(3);
    }
    fields[0] = sentenceId;

    let parser = decoders[sentenceId];
    if (!parser && sentenceId.substr(0, 3) === "MTK") {
        parser = decodeMTK;
    }

    if (!parser) {
        throw Error(`No known parser for sentence ID "${sentenceId}".`);
    }

    let packet = parser(fields);
    packet.talkerId = talkerId;
    return packet;
};


export function encodeNmeaPacket(packet: Packet, talker: string = "P"): string {
    if (packet === undefined) {
        throw new Error("Packet must be given.");
    }

    const encoder = encoders[packet.sentenceId];
    if (encoder) {
        return encoder(packet, talker);
    } else {
        throw Error(`No known encoder for sentence ID "${packet.sentenceId}"`);
    }
}
