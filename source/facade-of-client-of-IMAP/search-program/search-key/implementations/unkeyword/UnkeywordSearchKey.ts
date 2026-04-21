import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUnkeywordSearchKey} from "./type/index.ts";
export class UnkeywordSearchKey<
	FlagKeywordToUse extends string,
> implements SearchKey<typeof typeOfUnkeywordSearchKey> {
	public constructor(flagKeyword: FlagKeywordToUse) {
		this.flagKeyword = flagKeyword;
	}
	public readonly flagKeyword: FlagKeywordToUse;
	public readonly type: typeof typeOfUnkeywordSearchKey =
		typeOfUnkeywordSearchKey;
}
