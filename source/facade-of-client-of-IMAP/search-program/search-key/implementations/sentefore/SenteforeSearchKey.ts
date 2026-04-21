import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSentbeforeSearchKey} from "./type/index.ts";
export class SentbeforeSearchKey implements SearchKey<
	typeof typeOfSentbeforeSearchKey
> {
	public constructor(date: Date) {
		this.date = date;
	}
	public readonly date: Date;
	public readonly type: typeof typeOfSentbeforeSearchKey =
		typeOfSentbeforeSearchKey;
}
