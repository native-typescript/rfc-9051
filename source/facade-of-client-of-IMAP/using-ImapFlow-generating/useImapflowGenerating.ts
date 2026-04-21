import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import type {DoerInUsingImapflowGenerating} from "./doer/index.ts";
import {ImapFlow} from "imapflow";
export async function* useImapflowGenerating<Result>(
	configuration: ConfigurationOfFacadeOfClientOfImap,
	doer: DoerInUsingImapflowGenerating<Result>,
): AsyncGenerator<Result, void, void> {
	const client: ImapFlow = new ImapFlow({
		auth: {pass: configuration.user.password, user: configuration.user.name},
		host: configuration.hostname,
		logger: false,
		port: configuration.port.number,
		secure: configuration.port.isWithTls,
	});
	await client.connect();
	const results: AsyncIterable<Result, void, void> = doer(client);
	try {
		for await (const result of results) {
			yield result;
			continue;
		}
		await client.logout();
		return;
	} finally {
		client.close();
	}
}
