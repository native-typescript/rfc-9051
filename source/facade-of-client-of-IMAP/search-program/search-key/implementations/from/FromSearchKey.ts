import type {SearchKey} from "../../SearchKey.ts";
import {typeOfFromSearchKey} from "./type/index.ts";
export class FromSearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfFromSearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfFromSearchKey = typeOfFromSearchKey;
}
