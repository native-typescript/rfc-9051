import {schemaOfMailbox} from "../mailbox/index.ts";
import {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
/**
 * ImapFlow has serious issues parsing `Group`s. There is no way to parse it reliably as of version `1.0.191`.
 * Consider this:
 * ```
 * <recipient2@example.com>,
 * Recipients: <recipient1@example.com>, <recipient2@example.com>;,
 * <recipient1@example.com>,
 * Odbiorcy: <recipient1@example.com>, <recipient2@example.com>;,
 * <recipient1@example.com>
 * ```
 * ImapFlow will parse it as:
 * ```
 * [
 * 	{name: "", address: "recipient2@mail.mail.rfc-9051"},
 * 	{name: "", address: "Recipients@"},
 * 	{name: "", address: "recipient1@mail.mail.rfc-9051"},
 * 	{name: "", address: "recipient2@mail.mail.rfc-9051"},
 * 	{name: "", address: "recipient1@mail.mail.rfc-9051"},
 * 	{name: "", address: "Odbiorcy@"},
 * 	{name: "", address: "recipient1@mail.mail.rfc-9051"},
 * 	{name: "", address: "recipient2@mail.mail.rfc-9051"},
 * 	{name: "", address: "recipient1@mail.mail.rfc-9051"},
 * ]
 * ```
 * So the group structure is lost.
 */
export const schemaOfAddressList: z.ZodType<rfc5322.AddressList> = z
	.tuple([schemaOfMailbox], schemaOfMailbox)
	.transform<rfc5322.AddressList>(function parseAddressList(
		addresses: readonly [rfc5322.Mailbox, ...(readonly rfc5322.Mailbox[])],
	): rfc5322.AddressList {
		const addressList: rfc5322.AddressList = new rfc5322.AddressList(
			...addresses,
		);
		return addressList;
	});
