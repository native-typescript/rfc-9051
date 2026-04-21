import type {SearchKey} from "../../SearchKey.ts";
import {typeOfKeywordSearchKey} from "./type/index.ts";
export class KeywordSearchKey<
	FlagKeywordToUse extends string,
> implements SearchKey<typeof typeOfKeywordSearchKey> {
	public constructor(flagKeyword: FlagKeywordToUse) {
		this.flagKeyword = flagKeyword;
	}
	public readonly flagKeyword: FlagKeywordToUse;
	public readonly type: typeof typeOfKeywordSearchKey = typeOfKeywordSearchKey;
}
