import type {SearchKey} from "../../SearchKey.ts";
import {typeOfNotSearchKey} from "./type/index.ts";
export class NotSearchKey<
	SearchKeyToUse extends SearchKey<string>,
> implements SearchKey<typeof typeOfNotSearchKey> {
	public constructor(searchKey: SearchKeyToUse) {
		this.searchKey = searchKey;
	}
	public readonly searchKey: SearchKeyToUse;
	public readonly type: typeof typeOfNotSearchKey = typeOfNotSearchKey;
}
