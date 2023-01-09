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

import { parseStub, PacketStub } from "./codecs/PacketStub";
import { decodeSentence as decodeUnknown, UnknownPacket } from "./codecs/UnknownPacket";
import { validNmeaChecksum } from "./helpers";


export type Packet = APBPacket | BWCPacket | DBTPacket | DTMPacket | GGAPacket | GLLPacket | GNSPacket | GSAPacket | GSTPacket | GSVPacket | HDGPacket | HDMPacket | HDTPacket | MTKPacket | MWVPacket | RDIDPacket | RMCPacket | VHWPacket | VTGPacket | ZDAPacket;
export { APBPacket, BWCPacket, DBTPacket, DTMPacket, GGAPacket, GLLPacket, GNSPacket, GSAPacket, GSTPacket, GSVPacket, HDGPacket, HDMPacket, HDTPacket, MTKPacket, MWVPacket, RDIDPacket, RMCPacket, VHWPacket, VTGPacket, ZDAPacket };


type Decoder = (stub: PacketStub, parts: string[]) => Packet;


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


export interface PacketFactory<PacketType> {
    assemble: (stub: PacketStub, fields: string[]) => PacketType | null;
    ableToParseBadChecksum: boolean;
}


export class DefaultPacketFactory<CustomPacketType = null> implements PacketFactory<Packet | CustomPacketType> {
    ableToParseBadChecksum: boolean;

    constructor(ableToParseBadChecksum = false) {
        this.ableToParseBadChecksum = ableToParseBadChecksum;
    }

    static getParser(stub: PacketStub): Decoder {

        // Override for $PMTK314 and similar sentences
        if (stub.sentenceId.substr(0, 3) === "MTK") {
            return decodeMTK;
        }

        return decoders[stub.sentenceId];
    }

    assemble(stub: PacketStub, fields: string[]): Packet | CustomPacketType | null {
        const parser = DefaultPacketFactory.getParser(stub);

        if (parser) {
            return parser(stub, fields);
        }
        else {
            return this.assembleCustomPacket(stub, fields);
        }
    }

    assembleCustomPacket(stub: PacketStub, fields: string[]): CustomPacketType | null {
        return null;
    }
}

const DEFAULT_PACKET_FACTORY = new DefaultPacketFactory();


export function parseGenericPacket<PacketType>(sentence: string, factory: PacketFactory<PacketType>): PacketType {
    let chxOk = true;

    if (!validNmeaChecksum(sentence)) {
        if (!factory.ableToParseBadChecksum) {
            throw Error(`Invalid sentence: "${sentence}".`);
        }

        chxOk = false;
    }

    const fields = sentence.split("*")[0].split(",");
    const stub = parseStub(fields[0], chxOk);
    const packet = factory.assemble(stub, fields);

    if (!packet) {
        throw Error(`No known parser for sentence ID "${stub.sentenceId}".`);
    }

    return packet;
}


export function parseNmeaSentence(sentence: string): Packet {
    return parseGenericPacket(sentence, DEFAULT_PACKET_FACTORY);
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

// Unsafe parsing

export type UnsafePacket = Packet | UnknownPacket;

export class UnsafePacketFactory extends DefaultPacketFactory<UnknownPacket> {
    constructor() {
        super(true);
    }

    assembleCustomPacket(stub: PacketStub<string>, fields: string[]): UnknownPacket | null {
        return decodeUnknown(stub, fields);
    }
}

const UNSAFE_PACKET_FACTORY = new UnsafePacketFactory();


export function parseUnsafeNmeaSentence(sentence: string): UnsafePacket {
    return parseGenericPacket(sentence, UNSAFE_PACKET_FACTORY);
}


export function getUnsafePacketId(packet: UnsafePacket) : string {
    return (packet.sentenceId === "?") ? packet.originalPacketId : packet.sentenceId;
}
