import {TextPlainNonRootNodeOfBodystructureOfMessage} from "./TextPlainNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`TextPlainNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: TextPlainNonRootNodeOfBodystructureOfMessage =
			new TextPlainNonRootNodeOfBodystructureOfMessage(
				`description`,
				null,
				`base64`,
				{
					parameters: {charset: `ISO-8859-1`, format: null, name: null},
					value: `text/plain`,
				},
			);
		expect(Array.from(node.iterateNodes())).toStrictEqual([node]);
		return;
	});
	return;
});
