import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUndeletedSearchKey} from "./type/index.ts";
export class UndeletedSearchKey implements SearchKey<
	typeof typeOfUndeletedSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfUndeletedSearchKey =
		typeOfUndeletedSearchKey;
}
