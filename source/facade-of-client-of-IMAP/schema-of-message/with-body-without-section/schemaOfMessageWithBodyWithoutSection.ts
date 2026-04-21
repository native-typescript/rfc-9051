import {Message} from "../../../message/index.ts";
import {schemaOfBodystructureOfMessage} from "../bodystructure/index.ts";
import {schemaOfEnvelopeOfMessage} from "../envelope/index.ts";
import {schemaOfFlagsOfMessage} from "../flags/index.ts";
import {schemaOfHeaders} from "../headers/index.ts";
import {schemaOfId} from "../id/index.ts";
import {schemaOfInternalDate} from "../internalDate/index.ts";
import {schemaOfModseq} from "../modseq/index.ts";
import {schemaOfSeq} from "../seq/index.ts";
import {schemaOfSource} from "../source/index.ts";
import {schemaOfUid} from "../uid/index.ts";
import type {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
export const schemaOfMessageWithBodyWithoutSection: z.ZodType<
	Message<rfc5322.Message>
> = z
	.strictObject({
		bodyStructure: schemaOfBodystructureOfMessage,
		envelope: schemaOfEnvelopeOfMessage,
		flags: schemaOfFlagsOfMessage,
		headers: schemaOfHeaders,
		id: schemaOfId,
		internalDate: schemaOfInternalDate,
		modseq: schemaOfModseq,
		seq: schemaOfSeq,
		source: schemaOfSource,
		uid: schemaOfUid,
	})
	.transform<
		Message<rfc5322.Message>
	>(function parseMessageWithBodyWithoutSection(message): Message<rfc5322.Message> {
		const parsedMessage: Message<rfc5322.Message> =
			new Message<rfc5322.Message>(
				message.source,
				message.bodyStructure,
				message.envelope,
				message.flags,
				message.internalDate,
				message.uid,
			);
		return parsedMessage;
	});
