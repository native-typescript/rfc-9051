import type {SearchKey} from "../../SearchKey.ts";
import {typeOfCcSearchKey} from "./type/index.ts";
export class CcSearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfCcSearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfCcSearchKey = typeOfCcSearchKey;
}
