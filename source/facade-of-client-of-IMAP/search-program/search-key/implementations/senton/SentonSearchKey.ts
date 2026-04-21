import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSentonSearchKey} from "./type/index.ts";
export class SentonSearchKey implements SearchKey<
	typeof typeOfSentonSearchKey
> {
	public constructor(date: Date) {
		this.date = date;
	}
	public readonly date: Date;
	public readonly type: typeof typeOfSentonSearchKey = typeOfSentonSearchKey;
}
