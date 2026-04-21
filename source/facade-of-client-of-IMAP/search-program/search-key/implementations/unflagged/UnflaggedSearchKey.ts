import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUnflaggedSearchKey} from "./type/index.ts";
export class UnflaggedSearchKey implements SearchKey<
	typeof typeOfUnflaggedSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfUnflaggedSearchKey =
		typeOfUnflaggedSearchKey;
}
