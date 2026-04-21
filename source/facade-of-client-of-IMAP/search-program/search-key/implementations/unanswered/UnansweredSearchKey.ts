import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUnansweredSearchKey} from "./type/index.ts";
export class UnansweredSearchKey implements SearchKey<
	typeof typeOfUnansweredSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfUnansweredSearchKey =
		typeOfUnansweredSearchKey;
}
