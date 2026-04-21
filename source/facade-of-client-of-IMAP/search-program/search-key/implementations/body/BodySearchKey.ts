import type {SearchKey} from "../../SearchKey.ts";
import {typeOfBodySearchKey} from "./type/index.ts";
export class BodySearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfBodySearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfBodySearchKey = typeOfBodySearchKey;
}
