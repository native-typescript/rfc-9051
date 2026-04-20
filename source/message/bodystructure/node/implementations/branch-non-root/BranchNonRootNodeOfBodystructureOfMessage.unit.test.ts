import {LeafNonRootNodeOfBodystructureOfMessage} from "../leaf-non-root/index.ts";
import type {NonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
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
		const nodes: readonly (
			| BranchNonRootNodeOfBodystructureOfMessage
			| NonRootNodeOfBodystructureOfMessage<string>
		)[] = Array.from<
			| BranchNonRootNodeOfBodystructureOfMessage
			| NonRootNodeOfBodystructureOfMessage<string>
		>(node.iterateNodes());
		expect(nodes).toStrictEqual([node, firstLeaf, secondLeaf]);
		return;
	});
	return;
});
