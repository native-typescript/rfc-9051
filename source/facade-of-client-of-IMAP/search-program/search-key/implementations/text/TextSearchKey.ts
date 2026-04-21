import type {SearchKey} from "../../SearchKey.ts";
import {typeOfTextSearchKey} from "./type/index.ts";
export class TextSearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfTextSearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfTextSearchKey = typeOfTextSearchKey;
}
