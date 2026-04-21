import type {SupportedSearchKey} from "../../search-key/index.ts";
export type SupportedSearchKeys = readonly [
	SupportedSearchKey,
	...(readonly SupportedSearchKey[]),
];
