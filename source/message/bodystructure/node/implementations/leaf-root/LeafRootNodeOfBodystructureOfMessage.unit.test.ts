import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {LeafRootNodeOfBodystructureOfMessage} from "./LeafRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`LeafRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: LeafRootNodeOfBodystructureOfMessage =
			new LeafRootNodeOfBodystructureOfMessage(
				`description`,
				null,
				`quoted-printable`,
				{parameters: {name: `body.txt`}, value: `text/plain`},
			);
		const result: ResultOfIteratingOfBodystructureOfMessage<
			LeafRootNodeOfBodystructureOfMessage,
			null
		> = new ResultOfIteratingOfBodystructureOfMessage<
			LeafRootNodeOfBodystructureOfMessage,
			null
		>(node, null);
		expect(Array.from(node.iterateNodes())).toStrictEqual([result]);
		return;
	});
	return;
});
