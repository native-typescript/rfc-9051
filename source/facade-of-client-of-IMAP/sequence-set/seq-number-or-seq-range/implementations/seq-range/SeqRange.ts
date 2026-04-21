import type {SeqNumberOrSeqRange} from "../../SeqNumberOrSeqRange.ts";
import type {SeqNumber} from "../seq-number/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc9051#name-formal-syntax
 */
export class SeqRange implements SeqNumberOrSeqRange {
	public constructor(seqNumber1: SeqNumber, seqNumber2: SeqNumber) {
		this.seqNumber1 = seqNumber1;
		this.seqNumber2 = seqNumber2;
	}
	private readonly seqNumber1: SeqNumber;
	private readonly seqNumber2: SeqNumber;
	public serialize(): `${string}:${string}` {
		const serializedSeqNumber1: string = this.seqNumber1.serialize();
		const serializedSeqNumber2: string = this.seqNumber2.serialize();
		const stringifiedSeqRange: `${string}:${string}` = `${serializedSeqNumber1}:${serializedSeqNumber2}`;
		return stringifiedSeqRange;
	}
}
