import type {SearchKey} from "../../SearchKey.ts";
import {typeOfBccSearchKey} from "./type/index.ts";
export class BccSearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfBccSearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfBccSearchKey = typeOfBccSearchKey;
}
