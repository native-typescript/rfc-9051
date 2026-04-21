import type {SearchKey} from "../../SearchKey.ts";
import {typeOfOrSearchKey} from "./type/index.ts";
export class OrSearchKey<
	SearchKey1ToUse extends SearchKey<string>,
	SearchKey2ToUse extends SearchKey<string>,
> implements SearchKey<typeof typeOfOrSearchKey> {
	public constructor(
		subSearchKey1: SearchKey1ToUse,
		subSearchKey2: SearchKey2ToUse,
	) {
		this.subSearchKey1 = subSearchKey1;
		this.subSearchKey2 = subSearchKey2;
	}
	public readonly subSearchKey1: SearchKey1ToUse;
	public readonly subSearchKey2: SearchKey2ToUse;
	public readonly type: typeof typeOfOrSearchKey = typeOfOrSearchKey;
}
