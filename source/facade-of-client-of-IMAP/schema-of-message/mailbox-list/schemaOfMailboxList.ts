import {schemaOfMailbox} from "../mailbox/index.ts";
import {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
export const schemaOfMailboxList: z.ZodType<rfc5322.SupportedMailboxList> = z
	.tuple([schemaOfMailbox], schemaOfMailbox)
	.transform(function parseMailboxList(
		mailboxes: readonly [rfc5322.Mailbox, ...(readonly rfc5322.Mailbox[])],
	):
		| rfc5322.WithJustOneMailboxMailboxList
		| rfc5322.WithMoreThanOneMailboxMailboxList {
		const [firstMailbox, firstRestMailbox, ...restRestMailboxes] = mailboxes;
		if (firstRestMailbox === undefined) {
			const mailboxList: rfc5322.WithJustOneMailboxMailboxList =
				new rfc5322.WithJustOneMailboxMailboxList(firstMailbox);
			return mailboxList;
		} else {
			const mailboxList: rfc5322.WithMoreThanOneMailboxMailboxList =
				new rfc5322.WithMoreThanOneMailboxMailboxList(
					firstMailbox,
					firstRestMailbox,
					...restRestMailboxes,
				);
			return mailboxList;
		}
	});
