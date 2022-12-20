import "should";

import { initStubFields, PacketStub } from "../codecs/PacketStub";
import { appendChecksumFooter } from "../helpers";
import { parseGenericPacket, DefaultPacketFactory } from "../index";



const logSentenceId: "_LOG" = "_LOG";

interface LogPacket extends PacketStub<typeof logSentenceId> {
    logNum: number;
    logMsg: string;
}

const buttonPressSentenceId: "_BTN" = "_BTN";

interface ButtonPressPacket extends PacketStub<typeof buttonPressSentenceId> {
    buttonId: number;
    longPress: boolean;
}

type CustomPackets = LogPacket | ButtonPressPacket;

class CustomPacketFactory extends DefaultPacketFactory<CustomPackets> {

    assembleCustomPacket(stub: PacketStub, fields: string[]): CustomPackets | null {
        if (stub.talkerId === "P") {
            if (stub.sentenceId === logSentenceId) {
                return {
                    ...initStubFields(stub, logSentenceId),
                    logNum: parseInt(fields[1], 10),
                    logMsg: fields[2]
                };
            }
            else if (stub.sentenceId === buttonPressSentenceId) {
                return {
                    ...initStubFields(stub, buttonPressSentenceId),
                    buttonId: parseInt(fields[1], 10),
                    longPress: fields[2].charAt(0) === "L"
                };
            }
        }

        return null;
    }
}

const CUSTOM_PACKET_FACTORY = new CustomPacketFactory();



describe("CustomPackets", (): void => {
    it("Unknown throws", (): void => {
        ((): void => {
            parseGenericPacket(appendChecksumFooter("$--000,data1,data2"), CUSTOM_PACKET_FACTORY);
        }).should.throw("No known parser for sentence ID \"000\".");
    });


    it("Log", (): void => {
        const packet = parseGenericPacket(appendChecksumFooter("$P_LOG,5,everything is ok"), CUSTOM_PACKET_FACTORY);

        if (packet.sentenceId !== logSentenceId) {
            throw Error("Bad packet type");
        }

        packet.logNum.should.equal(5);
        packet.logMsg.should.equal("everything is ok");
    });

    it("Btn", (): void => {
        const packet = parseGenericPacket(appendChecksumFooter("$P_BTN,0,L"), CUSTOM_PACKET_FACTORY);

        if (packet.sentenceId !== buttonPressSentenceId) {
            throw Error("Bad packet type");
        }

        packet.buttonId.should.equal(0);
        packet.longPress.should.equal(true);
    });
});
