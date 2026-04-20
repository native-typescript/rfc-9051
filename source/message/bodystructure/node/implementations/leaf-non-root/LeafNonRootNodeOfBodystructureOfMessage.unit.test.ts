import {LeafNonRootNodeOfBodystructureOfMessage} from "./LeafNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`LeafNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: LeafNonRootNodeOfBodystructureOfMessage =
			new LeafNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {name: null},
				value: `text/plain`,
			});
		const nodes: readonly LeafNonRootNodeOfBodystructureOfMessage[] =
			Array.from<LeafNonRootNodeOfBodystructureOfMessage>(node.iterateNodes());
		expect(nodes).toStrictEqual([node]);
		return;
	});
	return;
});
