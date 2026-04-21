import type {SearchKey} from "../../SearchKey.ts";
import {typeOfAllSearchKey} from "./type/index.ts";
export class AllSearchKey implements SearchKey<typeof typeOfAllSearchKey> {
	public constructor() {}
	public readonly type: typeof typeOfAllSearchKey = typeOfAllSearchKey;
}
