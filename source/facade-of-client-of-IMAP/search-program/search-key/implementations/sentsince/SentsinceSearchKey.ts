import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSentsinceSearchKey} from "./type/index.ts";
export class SentsinceSearchKey implements SearchKey<
	typeof typeOfSentsinceSearchKey
> {
	public constructor(date: Date) {
		this.date = date;
	}
	public readonly date: Date;
	public readonly type: typeof typeOfSentsinceSearchKey =
		typeOfSentsinceSearchKey;
}
