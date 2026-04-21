import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import type {DoerInUsingImapflow} from "./doer/index.ts";
import {ImapFlow} from "imapflow";
export async function useImapflow<Result>(
	configuration: ConfigurationOfFacadeOfClientOfImap,
	doer: DoerInUsingImapflow<Result>,
): Promise<Result> {
	const client: ImapFlow = new ImapFlow({
		auth: {pass: configuration.user.password, user: configuration.user.name},
		host: configuration.hostname,
		logger: false,
		port: configuration.port.number,
		secure: configuration.port.isWithTls,
	});
	await client.connect();
	const result: Result = await doer(client);
	await client.logout();
	return result;
}
