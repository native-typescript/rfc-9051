import type {ImapFlow} from "imapflow";
export type DoerInRunningImapflow = (
	/**
	 * The client is connected.
	 */
	client: ImapFlow,
) => Promise<void>;
