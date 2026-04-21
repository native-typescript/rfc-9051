import type {SequenceSet} from "../../../../sequence-set/index.ts";
import type {SearchKey} from "../../SearchKey.ts";
import {typeOfSequenceSetSearchKey} from "./type/index.ts";
export class SequenceSetSearchKey<
	SequenceSetToUse extends SequenceSet,
> implements SearchKey<typeof typeOfSequenceSetSearchKey> {
	public constructor(sequenceSet: SequenceSetToUse) {
		this.sequenceSet = sequenceSet;
	}
	public readonly sequenceSet: SequenceSetToUse;
	public readonly type: typeof typeOfSequenceSetSearchKey =
		typeOfSequenceSetSearchKey;
}
