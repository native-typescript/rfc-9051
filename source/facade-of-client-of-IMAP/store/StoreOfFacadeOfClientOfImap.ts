import type {FlagsOfMessage} from "../../message/index.ts";
import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import type {Mailbox} from "../mailbox/index.ts";
import {runImapflowWithOpenedMailbox} from "../running-ImapFlow-with-opened-mailbox/index.ts";
import type {SequenceSet} from "../sequence-set/index.ts";
import type {ImapFlow} from "imapflow";
/**
 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing the [STORE command](https://datatracker.ietf.org/doc/html/rfc9051#name-store-command). You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
 */
export class StoreOfFacadeOfClientOfImap {
	public constructor(configuration: ConfigurationOfFacadeOfClientOfImap) {
		this.configuration = configuration;
	}
	public readonly configuration: ConfigurationOfFacadeOfClientOfImap;
	public async flags(
		mailboxName: Mailbox,
		sequenceSet: SequenceSet,
		flagList: FlagsOfMessage,
	): Promise<void> {
		await runImapflowWithOpenedMailbox(
			this.configuration,
			mailboxName,
			async function doFlags(client: ImapFlow): Promise<void> {
				await client.messageFlagsSet(
					sequenceSet.serialize(),
					Array.from(flagList),
				);
				return;
			},
		);
		return;
	}
	public async minusFlags(
		mailboxName: Mailbox,
		sequenceSet: SequenceSet,
		flagList: FlagsOfMessage,
	): Promise<void> {
		await runImapflowWithOpenedMailbox(
			this.configuration,
			mailboxName,
			async function doMinusFlags(client: ImapFlow): Promise<void> {
				await client.messageFlagsRemove(
					sequenceSet.serialize(),
					Array.from(flagList),
				);
				return;
			},
		);
		return;
	}
	public async plusFlags(
		mailboxName: Mailbox,
		sequenceSet: SequenceSet,
		flagList: FlagsOfMessage,
	): Promise<void> {
		await runImapflowWithOpenedMailbox(
			this.configuration,
			mailboxName,
			async function doPlusFlags(client: ImapFlow): Promise<void> {
				await client.messageFlagsAdd(
					sequenceSet.serialize(),
					Array.from(flagList),
				);
				return;
			},
		);
		return;
	}
}
