import { decodeSentence as decodeAPB, APBPacket } from "./codecs/APB";
import { decodeSentence as decodeBWC, BWCPacket } from "./codecs/BWC";
import { decodeSentence as decodeDBT, encodePacket as encodeDBT, DBTPacket } from "./codecs/DBT";
import { decodeSentence as decodeDTM, DTMPacket } from "./codecs/DTM";
import { decodeSentence as decodeGGA, encodePacket as encodeGGA, GGAPacket } from "./codecs/GGA";
import { decodeSentence as decodeGLL, encodePacket as encodeGLL, GLLPacket } from "./codecs/GLL";
import { decodeSentence as decodeGNS, encodePacket as encodeGNS, GNSPacket } from "./codecs/GNS";
import { decodeSentence as decodeGSA, GSAPacket } from "./codecs/GSA";
import { decodeSentence as decodeGST, GSTPacket } from "./codecs/GST";
import { decodeSentence as decodeGSV, GSVPacket } from "./codecs/GSV";
import { decodeSentence as decodeHDG, HDGPacket } from "./codecs/HDG";
import { decodeSentence as decodeHDM, encodePacket as encodeHDM, HDMPacket } from "./codecs/HDM";
import { decodeSentence as decodeHDT, encodePacket as encodeHDT, HDTPacket } from "./codecs/HDT";
import { decodeSentence as decodeMTK, encodePacket as encodeMTK, MTKPacket } from "./codecs/MTK";
import { decodeSentence as decodeMWV, encodePacket as encodeMWV, MWVPacket } from "./codecs/MWV";
import { decodeSentence as decodeRDID, RDIDPacket } from "./codecs/RDID";
import { decodeSentence as decodeRMC, RMCPacket } from "./codecs/RMC";
import { decodeSentence as decodeVHW, VHWPacket } from "./codecs/VHW";
import { decodeSentence as decodeVTG, encodePacket as encodeVTG, VTGPacket } from "./codecs/VTG";
import { decodeSentence as decodeZDA, ZDAPacket } from "./codecs/ZDA";

import { validNmeaChecksum } from "./helpers";


export type Packet = APBPacket | BWCPacket | DBTPacket | DTMPacket | GGAPacket | GLLPacket | GNSPacket | GSAPacket | GSTPacket | GSVPacket | HDGPacket | HDMPacket | HDTPacket | MTKPacket | MWVPacket | RDIDPacket | RMCPacket | VHWPacket | VTGPacket | ZDAPacket;
export { APBPacket, BWCPacket, DBTPacket, DTMPacket, GGAPacket, GLLPacket, GNSPacket, GSAPacket, GSTPacket, GSVPacket, HDGPacket, HDMPacket, HDTPacket, MTKPacket, MWVPacket, RDIDPacket, RMCPacket, VHWPacket, VTGPacket, ZDAPacket };


type Decoder = (parts: string[]) => Packet;


const decoders: { [sentenceId: string]: Decoder } = {
    APB: decodeAPB,
    BWC: decodeBWC,
    DBT: decodeDBT,
    DTM: decodeDTM,
    GGA: decodeGGA,
    GLL: decodeGLL,
    GNS: decodeGNS,
    GSA: decodeGSA,
    GST: decodeGST,
    GSV: decodeGSV,
    HDG: decodeHDG,
    HDM: decodeHDM,
    HDT: decodeHDT,
    MTK: decodeMTK,
    MWV: decodeMWV,
    RDID: decodeRDID,
    RMC: decodeRMC,
    VHW: decodeVHW,
    VTG: decodeVTG,
    ZDA: decodeZDA
};


type Encoder = (packet: Packet, talker: string) => string;


const encoders: { [sentenceId: string]: Encoder } = {
    DBT: encodeDBT as Encoder,
    GGA: encodeGGA as Encoder,
    GLL: encodeGLL as Encoder,
    GNS: encodeGNS as Encoder,
    HDM: encodeHDM as Encoder,
    HDT: encodeHDT as Encoder,
    MTK: encodeMTK as Encoder,
    MWV: encodeMWV as Encoder,
    VTG: encodeVTG as Encoder
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

    const packet = parser(fields);
    packet.talkerId = talkerId;
    return packet;
}


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
