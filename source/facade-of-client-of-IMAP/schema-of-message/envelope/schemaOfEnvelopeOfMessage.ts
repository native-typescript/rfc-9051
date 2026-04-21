import {EnvelopeOfMessage} from "../../../message/index.ts";
import {schemaOfAddressList} from "../address-list/index.ts";
import {schemaOfMailboxList} from "../mailbox-list/index.ts";
import {schemaOfMailbox} from "../mailbox/index.ts";
import {schemaOfMsgId} from "../msg-id/index.ts";
import type {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
export const schemaOfEnvelopeOfMessage: z.ZodType<EnvelopeOfMessage> = z
	.strictObject({
		bcc: z.union([
			schemaOfAddressList,
			z.undefined().transform<null>(function makeNull(bcc: undefined): null {
				return null;
			}),
		]),
		cc: z.union([
			schemaOfAddressList,
			z.undefined().transform<null>(function makeNull(cc: undefined): null {
				return null;
			}),
		]),
		date: z.union([
			z.date(),
			z.undefined().transform<null>(function makeNull(date: undefined): null {
				return null;
			}),
		]),
		from: schemaOfMailboxList,
		inReplyTo: z.union([
			z
				.string()
				.nonempty()
				.transform<string[]>(function parseInReplyTo(
					inReplyTo: string,
				): string[] {
					const parsedInReplyTo: string[] = inReplyTo.split(` `);
					return parsedInReplyTo;
				})
				.pipe(z.tuple([schemaOfMsgId], schemaOfMsgId)),
			z.undefined().transform<null>(function makeNull(
				inReplyTo: undefined,
			): null {
				return null;
			}),
		]),
		messageId: z.union([
			schemaOfMsgId,
			z.undefined().transform<null>(function makeNull(
				messageId: undefined,
			): null {
				return null;
			}),
		]),
		replyTo: z.union([
			schemaOfAddressList,
			z.undefined().transform<null>(function makeNNull(
				replyTo: undefined,
			): null {
				return null;
			}),
		]),
		sender: z
			.tuple([schemaOfMailbox])
			.transform<rfc5322.Mailbox>(function parseSenderMailboxTuple(
				sender: readonly [rfc5322.Mailbox],
			): rfc5322.Mailbox {
				const [parsedSender] = sender;
				return parsedSender;
			}),
		subject: z.union([
			z.string().nonempty(),
			z.undefined().transform<null>(function makeNull(
				subject: undefined,
			): null {
				return null;
			}),
		]),
		to: z.union([
			schemaOfAddressList,
			z.undefined().transform<null>(function makeNull(
				addressList: undefined,
			): null {
				return null;
			}),
		]),
	})
	.transform<EnvelopeOfMessage>(
		function parseEnvelope(rawEnvelope): EnvelopeOfMessage {
			const parsedEnvelope: EnvelopeOfMessage = new EnvelopeOfMessage(
				rawEnvelope.bcc,
				rawEnvelope.cc,
				rawEnvelope.date,
				rawEnvelope.from,
				rawEnvelope.inReplyTo,
				rawEnvelope.messageId,
				rawEnvelope.replyTo,
				rawEnvelope.sender,
				rawEnvelope.subject,
				rawEnvelope.to,
			);
			return parsedEnvelope;
		},
	);
