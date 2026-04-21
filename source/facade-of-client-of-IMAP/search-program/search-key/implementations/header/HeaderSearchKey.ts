import type {SearchKey} from "../../SearchKey.ts";
import {typeOfHeaderSearchKey} from "./type/index.ts";
export class HeaderSearchKey<
	HeaderFldNameToUse extends string,
	AstringToUse extends string,
> implements SearchKey<typeof typeOfHeaderSearchKey> {
	public constructor(headerFldName: HeaderFldNameToUse, astring: AstringToUse) {
		this.astring = astring;
		this.headerFldName = headerFldName;
	}
	public readonly astring: AstringToUse;
	public readonly headerFldName: HeaderFldNameToUse;
	public readonly type: typeof typeOfHeaderSearchKey = typeOfHeaderSearchKey;
}
