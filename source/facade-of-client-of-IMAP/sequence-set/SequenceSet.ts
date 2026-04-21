import type {SeqNumberOrSeqRange} from "./seq-number-or-seq-range/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc9051#name-formal-syntax
 */
export class SequenceSet {
	public constructor(
		elements: readonly [
			SeqNumberOrSeqRange,
			...(readonly SeqNumberOrSeqRange[]),
		],
	) {
		this.elements = elements;
	}
	private readonly elements: readonly [
		SeqNumberOrSeqRange,
		...(readonly SeqNumberOrSeqRange[]),
	];
	public serialize(): string {
		const serializedElementsOfThis: readonly string[] =
			this.elements.map<string>(function serializeElement(
				element: SeqNumberOrSeqRange,
			): string {
				const serializedElement: string = element.serialize();
				return serializedElement;
			});
		const serializedThis: string = serializedElementsOfThis.join(`,`);
		return serializedThis;
	}
}
