import type {SearchKey} from "../search-key/index.ts";
export type SearchKeys = readonly [
	SearchKey<string>,
	...(readonly SearchKey<string>[]),
];
