import {Message} from "../../../message/index.ts";
import {schemaOfBodystructureOfMessage} from "../bodystructure/index.ts";
import {schemaOfEnvelopeOfMessage} from "../envelope/index.ts";
import {schemaOfFlagsOfMessage} from "../flags/index.ts";
import {schemaOfHeaders} from "../headers/index.ts";
import {schemaOfId} from "../id/index.ts";
import {schemaOfInternalDate} from "../internalDate/index.ts";
import {schemaOfModseq} from "../modseq/index.ts";
import {schemaOfSeq} from "../seq/index.ts";
import {schemaOfUid} from "../uid/index.ts";
import {z} from "zod";
export const schemaOfMessageWithoutBody: z.ZodType<Message<null>> = z
	.strictObject({
		bodyStructure: schemaOfBodystructureOfMessage,
		envelope: schemaOfEnvelopeOfMessage,
		flags: schemaOfFlagsOfMessage,
		headers: schemaOfHeaders,
		id: schemaOfId,
		internalDate: schemaOfInternalDate,
		modseq: schemaOfModseq,
		seq: schemaOfSeq,
		uid: schemaOfUid,
	})
	.transform<
		Message<null>
	>(function parseMessageWithoutBody(message): Message<null> {
		const parsedMessage: Message<null> = new Message<null>(
			null,
			message.bodyStructure,
			message.envelope,
			message.flags,
			message.internalDate,
			message.uid,
		);
		return parsedMessage;
	});
