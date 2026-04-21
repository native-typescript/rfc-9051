import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import {
	type DoerInUsingImapflow,
	useImapflow,
} from "../using-ImapFlow/index.ts";
import type {ImapFlow} from "imapflow";
export async function useImapflowWithOpenedMailbox<Result>(
	configuration: ConfigurationOfFacadeOfClientOfImap,
	mailboxPath: string | string[],
	doer: DoerInUsingImapflow<Result>,
): Promise<Result> {
	const result: Result = await useImapflow(
		configuration,
		async function doWithOpenedMailbox(client: ImapFlow): Promise<Result> {
			await client.mailboxOpen(mailboxPath);
			const result: Result = await doer(client);
			await client.mailboxClose();
			return result;
		},
	);
	return result;
}
