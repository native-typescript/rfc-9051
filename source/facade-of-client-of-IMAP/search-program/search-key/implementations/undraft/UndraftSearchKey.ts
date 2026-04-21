import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUndraftSearchKey} from "./type/index.ts";
export class UndraftSearchKey implements SearchKey<
	typeof typeOfUndraftSearchKey
> {
	public constructor() {}
	public readonly type: typeof typeOfUndraftSearchKey = typeOfUndraftSearchKey;
}
