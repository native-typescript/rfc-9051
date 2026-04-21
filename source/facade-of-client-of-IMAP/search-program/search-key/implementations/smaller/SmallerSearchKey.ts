import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSmallerSearchKey} from "./type/index.ts";
export class SmallerSearchKey<NumberToUse extends number> implements SearchKey<
	typeof typeOfSmallerSearchKey
> {
	public constructor(number: NumberToUse) {
		this.number = number;
	}
	public readonly number: NumberToUse;
	public readonly type: typeof typeOfSmallerSearchKey = typeOfSmallerSearchKey;
}
