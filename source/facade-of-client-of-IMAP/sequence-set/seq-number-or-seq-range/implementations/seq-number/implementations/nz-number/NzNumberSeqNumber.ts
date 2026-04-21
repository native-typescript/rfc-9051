import type {SeqNumber} from "../../SeqNumber.ts";
export class NzNumberSeqNumber implements SeqNumber {
	public constructor(nzNumber: number) {
		this.nzNumber = nzNumber;
	}
	public readonly nzNumber: number;
	public serialize(): string {
		const serializedThis: string = this.nzNumber.toString(10);
		return serializedThis;
	}
}
