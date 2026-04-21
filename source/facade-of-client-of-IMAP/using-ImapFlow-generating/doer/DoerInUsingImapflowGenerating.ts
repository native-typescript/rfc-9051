import type {ImapFlow} from "imapflow";
export type DoerInUsingImapflowGenerating<Result> = (
	/**
	 * The client is connected.
	 */
	client: ImapFlow,
) => AsyncIterable<Result, void, void>;
