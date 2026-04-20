import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
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
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1);
		const result: ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(node, section);
		const nodes: readonly ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>[] = Array.from<
			ResultOfIteratingOfBodystructureOfMessage<
				LeafNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
			>
		>(node.iterateNodes(section));
		expect(nodes).toStrictEqual([result]);
		return;
	});
	return;
});
