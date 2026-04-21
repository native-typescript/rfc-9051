import type {SearchKey} from "../../SearchKey.ts";
import {typeOfOnSearchKey} from "./type/index.ts";
export class OnSearchKey implements SearchKey<typeof typeOfOnSearchKey> {
	public constructor(date: Date) {
		this.date = date;
	}
	public readonly date: Date;
	public readonly type: typeof typeOfOnSearchKey = typeOfOnSearchKey;
}
