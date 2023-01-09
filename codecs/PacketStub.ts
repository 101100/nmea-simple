export interface PacketStub<IdType = string> {
    sentenceId: IdType;
    talkerId?: string;

    // User info
    chxOk?: true;
    sentenceName?: string;
}

export function initStubFields<IdType>(stub: PacketStub, id: IdType, sentenceName?: string): PacketStub<IdType> {
    return {
        sentenceId: id,
        talkerId: stub.talkerId,
        chxOk: stub.chxOk,
        sentenceName
    };
}

export function parseStub(field0: string, chxOk: boolean): PacketStub {

    let talkerId: string;
    let sentenceId: string;

    if (field0.charAt(1) === "P") {
        talkerId = "P"; // Proprietary
        sentenceId = field0.substr(2);
    } else {
        talkerId = field0.substr(1, 2);
        sentenceId = field0.substr(3);
    }

    return { talkerId, sentenceId, chxOk: (chxOk ? chxOk : undefined) };
}
