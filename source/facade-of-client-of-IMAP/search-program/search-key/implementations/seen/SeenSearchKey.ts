import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSeenSearchKey} from "./type/index.ts";
export class SeenSearchKey implements SearchKey<typeof typeOfSeenSearchKey> {
	public constructor() {}
	public readonly type: typeof typeOfSeenSearchKey = typeOfSeenSearchKey;
}
