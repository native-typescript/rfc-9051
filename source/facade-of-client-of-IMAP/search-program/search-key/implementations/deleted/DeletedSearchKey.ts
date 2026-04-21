import type {SearchKey} from "../../SearchKey.ts";
import {typeOfDeletedSearchKey} from "./type/index.ts";
export class DeletedSearchKey implements SearchKey<
	typeof typeOfDeletedSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfDeletedSearchKey = typeOfDeletedSearchKey;
}
