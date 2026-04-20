import {TextNonPlainRootNodeOfBodystructureOfMessage} from "./TextNonPlainRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`TextNonPlainRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: TextNonPlainRootNodeOfBodystructureOfMessage =
			new TextNonPlainRootNodeOfBodystructureOfMessage(
				`description`,
				{
					otherParameters: {x: `1`},
					standardizedParameters: {filename: `body.html`},
					value: `inline`,
				},
				`8bit`,
				{
					parameters: {charset: `US-ASCII`, name: `body.html`},
					value: `text/html`,
				},
			);
		expect(Array.from(node.iterateNodes())).toStrictEqual([node]);
		return;
	});
	return;
});
