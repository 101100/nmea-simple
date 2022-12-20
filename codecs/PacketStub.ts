export interface PacketStub<IdType = string> {
    sentenceId: IdType;
    talkerId?: string;

    // User info
    sentenceName?: string;
}

export function initStubFields<IdType>(stub: PacketStub, id: IdType, sentenceName?: string): PacketStub<IdType> {
    return {
        sentenceId: id,
        talkerId: stub.talkerId,
        sentenceName
    };
}
