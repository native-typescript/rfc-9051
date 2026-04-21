import type {SearchKey} from "../../SearchKey.ts";
import {typeOfToSearchKey} from "./type/index.ts";
export class ToSearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfToSearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfToSearchKey = typeOfToSearchKey;
}
