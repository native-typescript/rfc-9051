import type {ImapFlow} from "imapflow";
export type DoerInUsingImapflow<Result> = (
	/**
	 * The client is connected.
	 */
	client: ImapFlow,
) => Promise<Result>;
