import type {SearchKeys} from "../../../search-keys/index.ts";
import type {SearchKey} from "../../SearchKey.ts";
import {typeOfParenthesesSearchKey} from "./type/index.ts";
export class ParenthesesSearchKey<
	SubSearchKeysToUse extends SearchKeys,
> implements SearchKey<typeof typeOfParenthesesSearchKey> {
	public constructor(subSearchKeys: SubSearchKeysToUse) {
		this.subSearchKeys = subSearchKeys;
	}
	public readonly subSearchKeys: SubSearchKeysToUse;
	public readonly type: typeof typeOfParenthesesSearchKey =
		typeOfParenthesesSearchKey;
}
