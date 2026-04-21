import type {SearchKey} from "../../SearchKey.ts";
import {typeOfLargerSearchKey} from "./type/index.ts";
export class LargerSearchKey<NumberToUse extends number> implements SearchKey<
	typeof typeOfLargerSearchKey
> {
	public constructor(number: NumberToUse) {
		this.number = number;
	}
	public readonly number: NumberToUse;
	public readonly type: typeof typeOfLargerSearchKey = typeOfLargerSearchKey;
}
