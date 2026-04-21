import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import {
	type DoerInRunningImapflow,
	runImapflow,
} from "../running-ImapFlow/index.ts";
import type {ImapFlow} from "imapflow";
export async function runImapflowWithOpenedMailbox(
	configuration: ConfigurationOfFacadeOfClientOfImap,
	mailboxPath: string | string[],
	doer: DoerInRunningImapflow,
): Promise<void> {
	await runImapflow(
		configuration,
		async function doDoing(client: ImapFlow): Promise<void> {
			await client.mailboxOpen(mailboxPath);
			await doer(client);
			await client.mailboxClose();
			return;
		},
	);
	return;
}
