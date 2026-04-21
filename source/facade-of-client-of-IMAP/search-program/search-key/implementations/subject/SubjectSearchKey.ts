import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSubjectSearchKey} from "./type/index.ts";
export class SubjectSearchKey<AstringToUse extends string> implements SearchKey<
	typeof typeOfSubjectSearchKey
> {
	public constructor(astring: AstringToUse) {
		this.astring = astring;
	}
	public readonly astring: AstringToUse;
	public readonly type: typeof typeOfSubjectSearchKey = typeOfSubjectSearchKey;
}
