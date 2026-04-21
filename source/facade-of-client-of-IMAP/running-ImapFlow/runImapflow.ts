import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import type {DoerInRunningImapflow} from "./doer/index.ts";
import {ImapFlow} from "imapflow";
export async function runImapflow(
	configuration: ConfigurationOfFacadeOfClientOfImap,
	doer: DoerInRunningImapflow,
): Promise<void> {
	const client: ImapFlow = new ImapFlow({
		auth: {pass: configuration.user.password, user: configuration.user.name},
		host: configuration.hostname,
		logger: false,
		port: configuration.port.number,
		secure: configuration.port.isWithTls,
	});
	await client.connect();
	await doer(client);
	await client.logout();
	return;
}
