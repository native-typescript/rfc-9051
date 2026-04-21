import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import {
	type DoerInUsingImapflowGenerating,
	useImapflowGenerating,
} from "../using-ImapFlow-generating/index.ts";
import type {ImapFlow} from "imapflow";
export async function* useImapflowGeneratingWithOpenedMailbox<Result>(
	configuration: ConfigurationOfFacadeOfClientOfImap,
	mailboxPath: string | string[],
	doer: DoerInUsingImapflowGenerating<Result>,
): AsyncGenerator<Result, void, void> {
	const results: AsyncIterable<Result, void, void> = useImapflowGenerating(
		configuration,
		async function* generateWithOpenedMailbox(
			client: ImapFlow,
		): AsyncGenerator<Result, void, void> {
			await client.mailboxOpen(mailboxPath);
			const results: AsyncIterable<Result, void, void> = doer(client);
			for await (const result of results) {
				yield result;
				continue;
			}
			await client.mailboxClose();
			return;
		},
	);
	for await (const result of results) {
		yield result;
		continue;
	}
	return;
}
