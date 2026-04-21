import type {SearchKey} from "../../SearchKey.ts";
import {typeOfAnsweredSearchKey} from "./type/index.ts";
export class AnsweredSearchKey implements SearchKey<
	typeof typeOfAnsweredSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfAnsweredSearchKey =
		typeOfAnsweredSearchKey;
}
