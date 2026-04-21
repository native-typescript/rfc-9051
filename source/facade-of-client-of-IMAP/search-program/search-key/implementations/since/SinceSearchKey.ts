import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSinceSearchKey} from "./type/index.ts";
export class SinceSearchKey implements SearchKey<typeof typeOfSinceSearchKey> {
	public constructor(date: Date) {
		this.date = date;
	}
	public readonly date: Date;
	public readonly type: typeof typeOfSinceSearchKey = typeOfSinceSearchKey;
}
