import type {FlagsOfMessage} from "../../../message/index.ts";
import type {ConfigurationOfFacadeOfClientOfImap} from "../../configuration/index.ts";
import type {Mailbox} from "../../mailbox/index.ts";
import {runImapflowWithOpenedMailbox} from "../../running-ImapFlow-with-opened-mailbox/index.ts";
import type {SequenceSet} from "../../sequence-set/index.ts";
import type {ImapFlow} from "imapflow";
export class StoreOfUidOfFacadeOfClientOfImap {
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
					{uid: true},
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
					{uid: true},
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
					{uid: true},
				);
				return;
			},
		);
		return;
	}
}
