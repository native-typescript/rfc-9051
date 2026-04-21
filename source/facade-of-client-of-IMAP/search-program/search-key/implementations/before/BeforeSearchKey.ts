import type {SearchKey} from "../../SearchKey.ts";
import {typeOfBeforeSearchKey} from "./type/index.ts";
export class BeforeSearchKey implements SearchKey<
	typeof typeOfBeforeSearchKey
> {
	public constructor(date: Date) {
		this.date = date;
	}
	public readonly date: Date;
	public readonly type: typeof typeOfBeforeSearchKey = typeOfBeforeSearchKey;
}
