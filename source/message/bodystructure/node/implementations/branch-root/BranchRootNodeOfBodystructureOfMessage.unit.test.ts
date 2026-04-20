import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {BranchNonRootNodeOfBodystructureOfMessage} from "../branch-non-root/index.ts";
import {LeafNonRootNodeOfBodystructureOfMessage} from "../leaf-non-root/index.ts";
import type {SupportedNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {BranchRootNodeOfBodystructureOfMessage} from "./BranchRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`BranchRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
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
		const nestedBranch: BranchNonRootNodeOfBodystructureOfMessage =
			new BranchNonRootNodeOfBodystructureOfMessage([firstLeaf, secondLeaf], {
				parameters: {boundary: `nested`},
				value: `multipart/alternative`,
			});
		const attachment: LeafNonRootNodeOfBodystructureOfMessage =
			new LeafNonRootNodeOfBodystructureOfMessage(
				null,
				{
					otherParameters: {},
					standardizedParameters: {filename: `attachment.txt`},
					value: `attachment`,
				},
				`base64`,
				{parameters: {name: `attachment.txt`}, value: `text/plain`},
			);
		const node: BranchRootNodeOfBodystructureOfMessage =
			new BranchRootNodeOfBodystructureOfMessage([nestedBranch, attachment], {
				parameters: {boundary: `root`, type: null},
				value: `multipart/mixed`,
			});
		const nodes: readonly (
			| ResultOfIteratingOfBodystructureOfMessage<
					BranchRootNodeOfBodystructureOfMessage,
					null
			  >
			| ResultOfIteratingOfBodystructureOfMessage<
					SupportedNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
			  >
		)[] = Array.from<
			| ResultOfIteratingOfBodystructureOfMessage<
					BranchRootNodeOfBodystructureOfMessage,
					null
			  >
			| ResultOfIteratingOfBodystructureOfMessage<
					SupportedNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
			  >
		>(node.iterateNodes());
		expect(nodes).toStrictEqual([
			new ResultOfIteratingOfBodystructureOfMessage<
				BranchRootNodeOfBodystructureOfMessage,
				null
			>(node, null),
			new ResultOfIteratingOfBodystructureOfMessage<
				SupportedNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
			>(nestedBranch, new SectionOfBodyOfMessage(1)),
			new ResultOfIteratingOfBodystructureOfMessage<
				SupportedNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
			>(firstLeaf, new SectionOfBodyOfMessage(1, 1)),
			new ResultOfIteratingOfBodystructureOfMessage<
				SupportedNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
			>(secondLeaf, new SectionOfBodyOfMessage(1, 2)),
			new ResultOfIteratingOfBodystructureOfMessage<
				SupportedNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
			>(attachment, new SectionOfBodyOfMessage(2)),
		]);
		return;
	});
	return;
});
