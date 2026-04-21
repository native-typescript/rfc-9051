import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUnseenSearchKey} from "./type/index.ts";
export class UnseenSearchKey implements SearchKey<
	typeof typeOfUnseenSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfUnseenSearchKey = typeOfUnseenSearchKey;
}
