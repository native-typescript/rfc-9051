export class SectionOfBodyOfMessage {
	public constructor(...segments: readonly [number, ...(readonly number[])]) {
		this.segments = segments;
	}
	public appendSegment(segment: number): SectionOfBodyOfMessage {
		const segmentsOfUpdatedThis: readonly [
			number,
			...(readonly number[]),
			number,
		] = [...this.segments, segment];
		const updatedThis: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(
			...segmentsOfUpdatedThis,
		);
		return updatedThis;
	}
	public readonly segments: readonly [number, ...(readonly number[])];
	public serialize(): string {
		const serializedSegmentsOfThis: readonly string[] = this.segments.map(
			function serializeSegment(segment: number): string {
				const serializedSegment: string = segment.toString(10);
				return serializedSegment;
			},
		);
		const serializedThis: string = serializedSegmentsOfThis.join(`.`);
		return serializedThis;
	}
	public *[Symbol.iterator](): Generator<number, void, void> {
		for (const segment of this.segments) {
			yield segment;
			continue;
		}
		return;
	}
}
