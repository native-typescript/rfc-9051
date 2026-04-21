import type {SequenceSet} from "../../../../sequence-set/index.ts";
import type {SearchKey} from "../../SearchKey.ts";
import {typeOfUidSearchKey} from "./type/index.ts";
export class UidSearchKey<
	SequenceSetToUse extends SequenceSet,
> implements SearchKey<typeof typeOfUidSearchKey> {
	public constructor(sequenceSet: SequenceSetToUse) {
		this.sequenceSet = sequenceSet;
	}
	public readonly sequenceSet: SequenceSetToUse;
	public readonly type: typeof typeOfUidSearchKey = typeOfUidSearchKey;
}
