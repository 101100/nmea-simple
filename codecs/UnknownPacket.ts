import { initStubFields, PacketStub } from "./PacketStub";

export const sentenceId: "?" = "?";

export interface UnknownPacket extends PacketStub<typeof sentenceId> {
    dataFields: string[];
    originalPacketId: string;
}

export function decodeSentence(stub: PacketStub, fields: string[]): UnknownPacket {
    return {
        ...initStubFields(stub, sentenceId),
        originalPacketId: stub.sentenceId,
        dataFields: fields.slice(1)
    };
}
