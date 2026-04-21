import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import type {Mailbox} from "../mailbox/index.ts";
import {useImapflow} from "../using-ImapFlow/index.ts";
import {schemaOfStatusObjectToCountOfMessages} from "./schema-of-status-object-to-count-of-messages/index.ts";
import type {ImapFlow, StatusObject} from "imapflow";
export class StatusOfFacadeOfClientOfImap {
	public constructor(configuration: ConfigurationOfFacadeOfClientOfImap) {
		this.configuration = configuration;
	}
	public readonly configuration: ConfigurationOfFacadeOfClientOfImap;
	public async messages(mailboxName: Mailbox): Promise<number> {
		const countOfMessages: number = await useImapflow<number>(
			this.configuration,
			async function doMessages(client: ImapFlow): Promise<number> {
				const statusObject: StatusObject = await client.status(mailboxName, {
					messages: true,
				});
				const countOfMessages: number =
					schemaOfStatusObjectToCountOfMessages.parse(statusObject);
				return countOfMessages;
			},
		);
		return countOfMessages;
	}
}
