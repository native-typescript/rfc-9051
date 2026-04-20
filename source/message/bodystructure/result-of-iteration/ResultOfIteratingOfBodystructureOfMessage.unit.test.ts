import {SectionOfBodyOfMessage} from "../../body/index.ts";
import {LeafRootNodeOfBodystructureOfMessage} from "../node/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "./ResultOfIteratingOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`ResultOfIteratingOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`stores node and section`, async function executeTest(): Promise<void> {
		const leaf = new LeafRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
			parameters: {name: null},
			value: `text/plain`,
		});
		const result = new ResultOfIteratingOfBodystructureOfMessage(
			leaf,
			new SectionOfBodyOfMessage(1),
		);
		expect(result.node).toBe(leaf);
		expect(result.section).toStrictEqual(new SectionOfBodyOfMessage(1));
		return;
	});
	return;
});
