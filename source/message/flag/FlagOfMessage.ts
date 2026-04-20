import type {
	KeywordFlagOfMessage,
	SystemFlagFlagOfMessage,
} from "./types/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc9051#name-flags-message-attribute
 */
export type FlagOfMessage =
	| KeywordFlagOfMessage
	/* eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents */
	| SystemFlagFlagOfMessage;
