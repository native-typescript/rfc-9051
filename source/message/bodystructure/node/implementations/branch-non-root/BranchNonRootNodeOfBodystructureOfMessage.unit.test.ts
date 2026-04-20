import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {LeafNonRootNodeOfBodystructureOfMessage} from "../leaf-non-root/index.ts";
import type {SupportedNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {BranchNonRootNodeOfBodystructureOfMessage} from "./BranchNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`BranchNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`role is branch`, async function executeTest(): Promise<void> {
		const leaf: LeafNonRootNodeOfBodystructureOfMessage =
			new LeafNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {name: null},
				value: `text/plain`,
			});
		const node: BranchNonRootNodeOfBodystructureOfMessage =
			new BranchNonRootNodeOfBodystructureOfMessage([leaf], {
				parameters: {boundary: `boundary`},
				value: `multipart/mixed`,
			});
		expect(node.role).toStrictEqual(`branch`);
		return;
	});
	await test(`iterateNodes yields depth-first order`, async function executeTest(): Promise<void> {
		const firstLeaf: LeafNonRootNodeOfBodystructureOfMessage =
			new LeafNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {name: null},
				value: `text/plain`,
			});
		const secondLeaf: LeafNonRootNodeOfBodystructureOfMessage =
			new LeafNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {name: null},
				value: `text/html`,
			});
		const node: BranchNonRootNodeOfBodystructureOfMessage =
			new BranchNonRootNodeOfBodystructureOfMessage([firstLeaf, secondLeaf], {
				parameters: {boundary: `nested`},
				value: `multipart/alternative`,
			});
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1);
		const resultOfThis: ResultOfIteratingOfBodystructureOfMessage<
			BranchNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			BranchNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(node, section);
		const firstLeafSection: SectionOfBodyOfMessage = section.appendSegment(1);
		const resultOfFirstLeaf: ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(firstLeaf, firstLeafSection);
		const secondLeafSection: SectionOfBodyOfMessage = section.appendSegment(2);
		const resultOfSecondLeaf: ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			LeafNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(secondLeaf, secondLeafSection);
		const nodes: readonly (
			| ResultOfIteratingOfBodystructureOfMessage<
					BranchNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
			  >
			| ResultOfIteratingOfBodystructureOfMessage<
					SupportedNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
			  >
		)[] = Array.from<
			| ResultOfIteratingOfBodystructureOfMessage<
					BranchNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
			  >
			| ResultOfIteratingOfBodystructureOfMessage<
					SupportedNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
			  >
		>(node.iterateNodes(section));
		expect(nodes).toStrictEqual([
			resultOfThis,
			resultOfFirstLeaf,
			resultOfSecondLeaf,
		]);
		return;
	});
	return;
});
