import {SectionOfBodyOfMessage} from "./SectionOfBodyOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`SectionOfBodyOfMessage`, async function executeTests(): Promise<void> {
	await test(`appendSegment returns a new section`, async function executeTest(): Promise<void> {
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1, 2);
		const appendedSection: SectionOfBodyOfMessage = section.appendSegment(3);
		expect(appendedSection).toStrictEqual(new SectionOfBodyOfMessage(1, 2, 3));
		expect(section).toStrictEqual(new SectionOfBodyOfMessage(1, 2));
		return;
	});
	await test(`serialize joins segments with dots`, async function executeTest(): Promise<void> {
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(
			4,
			2,
			10,
		);
		expect(section.serialize()).toBe(`4.2.10`);
		return;
	});
	await test(`iterator yields segments in order`, async function executeTest(): Promise<void> {
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(5, 6, 7);
		expect(Array.from(section)).toStrictEqual([5, 6, 7]);
		return;
	});
	return;
});
