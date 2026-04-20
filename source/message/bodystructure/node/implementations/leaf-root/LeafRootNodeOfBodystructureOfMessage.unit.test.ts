import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {LeafRootNodeOfBodystructureOfMessage} from "./LeafRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`LeafRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: LeafRootNodeOfBodystructureOfMessage =
			new LeafRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {name: null},
				value: `text/plain`,
			});
		const nodes: LeafRootNodeOfBodystructureOfMessage[] = Array.from(
			node.iterateNodes(),
		);
		expect(nodes).toStrictEqual([node]);
		return;
	});
	await test(`iterateLeafNodes yields root section`, async function executeTest(): Promise<void> {
		const node: LeafRootNodeOfBodystructureOfMessage =
			new LeafRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {name: null},
				value: `text/plain`,
			});
		const leafNodes: readonly ResultOfIteratingOfBodystructureOfMessage<LeafRootNodeOfBodystructureOfMessage>[] =
			Array.from(node.iterateLeafNodes());
		expect(leafNodes).toStrictEqual([
			new ResultOfIteratingOfBodystructureOfMessage<LeafRootNodeOfBodystructureOfMessage>(
				node,
				new SectionOfBodyOfMessage(1),
			),
		]);
		return;
	});
	return;
});
