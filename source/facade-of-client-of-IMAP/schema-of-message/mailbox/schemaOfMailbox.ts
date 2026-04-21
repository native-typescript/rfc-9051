import {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
export const schemaOfMailbox: z.ZodType<rfc5322.Mailbox> = z
	.strictObject({address: z.string(), name: z.string()})
	.transform<rfc5322.Mailbox>(function parseMailbox(messageAddressObject):
		| rfc5322.AddrSpec
		| rfc5322.WithDisplayNameNameAddr {
		/**
		 *	See `schemaOfAddressList` for explanation.
		 */
		if (messageAddressObject.address.endsWith(`@`)) {
			const error: Error = new Error(
				`Detected a group trying to be parsed. ImapFlow doesn't support it.`,
			);
			throw error;
		} else {
			const addrSpec: rfc5322.AddrSpec =
				rfc5322.createAddrSpecFromStringUnsafely(messageAddressObject.address);
			if (messageAddressObject.name === ``) {
				return addrSpec;
			} else {
				const angleAddrOfNameAddr: rfc5322.AngleAddr = new rfc5322.AngleAddr(
					addrSpec,
				);
				const nameAddr: rfc5322.WithDisplayNameNameAddr =
					new rfc5322.WithDisplayNameNameAddr(
						messageAddressObject.name,
						angleAddrOfNameAddr,
					);
				return nameAddr;
			}
		}
	});
