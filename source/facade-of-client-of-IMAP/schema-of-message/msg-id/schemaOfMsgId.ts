import {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
export const schemaOfMsgId: z.ZodType<rfc5322.MsgId, string> = z
	.templateLiteral([
		`<`,
		z.string().nonempty(),
		`@`,
		z.string().nonempty(),
		`>`,
	])
	.transform<rfc5322.MsgId>(function parseMsgId(
		msgIdAsString: `<${string}@${string}>`,
	): rfc5322.MsgId {
		const msgIdAsMsgId: rfc5322.MsgId =
			rfc5322.createMsgIdFromStringUnsafely(msgIdAsString);
		return msgIdAsMsgId;
	});
