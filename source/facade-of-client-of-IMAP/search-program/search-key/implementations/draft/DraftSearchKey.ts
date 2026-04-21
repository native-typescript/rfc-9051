import type {SearchKey} from "../../SearchKey.ts";
import {typeOfDraftSearchKey} from "./type/index.ts";
export class DraftSearchKey implements SearchKey<typeof typeOfDraftSearchKey> {
	public constructor() {}
	public readonly type: typeof typeOfDraftSearchKey = typeOfDraftSearchKey;
}
