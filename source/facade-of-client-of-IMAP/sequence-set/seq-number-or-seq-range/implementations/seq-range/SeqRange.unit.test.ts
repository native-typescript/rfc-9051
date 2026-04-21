import {NzNumberSeqNumber} from "../seq-number/index.ts";
import {SeqRange} from "./SeqRange.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`SeqRange`, async function executeTests(): Promise<void> {
	await test(`serialize joins endpoints with a colon`, async function executeTest(): Promise<void> {
		const seqRange: SeqRange = new SeqRange(
			new NzNumberSeqNumber(1),
			new NzNumberSeqNumber(10),
		);
		expect(seqRange.serialize()).toBe(`1:10`);
		return;
	});
	return;
});
