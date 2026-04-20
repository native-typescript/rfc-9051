import {TextPlainRootNodeOfBodystructureOfMessage} from "./TextPlainRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`TextPlainRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: TextPlainRootNodeOfBodystructureOfMessage =
			new TextPlainRootNodeOfBodystructureOfMessage(
				`description`,
				{
					otherParameters: {},
					standardizedParameters: {filename: `document.txt`},
					value: `attachment`,
				},
				`quoted-printable`,
				{
					parameters: {charset: `UTF-8`, format: `flowed`, name: `body.txt`},
					value: `text/plain`,
				},
			);
		expect(Array.from(node.iterateNodes())).toStrictEqual([node]);
		return;
	});
	return;
});
