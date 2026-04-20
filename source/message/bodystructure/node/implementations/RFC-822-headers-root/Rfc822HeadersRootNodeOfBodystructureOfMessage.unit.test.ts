import {Rfc822HeadersRootNodeOfBodystructureOfMessage} from "./Rfc822HeadersRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`Rfc822HeadersRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: Rfc822HeadersRootNodeOfBodystructureOfMessage =
			new Rfc822HeadersRootNodeOfBodystructureOfMessage(
				`description`,
				{
					otherParameters: {},
					standardizedParameters: {filename: `headers.txt`},
					value: `inline`,
				},
				`quoted-printable`,
				{
					parameters: {charset: `UTF-8`, name: null},
					value: `text/rfc822-headers`,
				},
			);
		expect(Array.from(node.iterateNodes())).toStrictEqual([node]);
		return;
	});
	return;
});
