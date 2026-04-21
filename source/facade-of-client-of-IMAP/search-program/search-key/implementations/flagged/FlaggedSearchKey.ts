import type {SearchKey} from "../../SearchKey.ts";
import {typeOfFlaggedSearchKey} from "./type/index.ts";
export class FlaggedSearchKey implements SearchKey<
	typeof typeOfFlaggedSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfFlaggedSearchKey = typeOfFlaggedSearchKey;
}
