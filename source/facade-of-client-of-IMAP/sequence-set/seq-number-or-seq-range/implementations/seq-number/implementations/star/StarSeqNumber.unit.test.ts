import {StarSeqNumber} from "./StarSeqNumber.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`StarSeqNumber`, async function executeTests(): Promise<void> {
	await test(`serialize returns a star`, async function executeTest(): Promise<void> {
		const starSeqNumber: StarSeqNumber = new StarSeqNumber();
		expect(starSeqNumber.serialize()).toBe(`*`);
		return;
	});
	return;
});
