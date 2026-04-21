import type {SeqNumber} from "../../SeqNumber.ts";
export class StarSeqNumber implements SeqNumber {
	public constructor() {}
	public serialize(): `*` {
		return `*`;
	}
}
