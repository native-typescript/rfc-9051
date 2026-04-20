import {EnvelopeOfMessage} from "../../../../envelope/index.ts";
import {TextNonPlainNonRootNodeOfBodystructureOfMessage} from "../text-non-plain-non-root/index.ts";
import {TextPlainNonRootNodeOfBodystructureOfMessage} from "../text-plain-non-root/index.ts";
import {Rfc822RootNodeOfBodystructureOfMessage} from "./Rfc822RootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`Rfc822RootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields depth-first order`, async function executeTest(): Promise<void> {
		const firstChild: TextPlainNonRootNodeOfBodystructureOfMessage =
			new TextPlainNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {charset: `UTF-8`, format: null, name: null},
				value: `text/plain`,
			});
		const secondChild: TextNonPlainNonRootNodeOfBodystructureOfMessage =
			new TextNonPlainNonRootNodeOfBodystructureOfMessage(null, null, `8bit`, {
				parameters: {charset: `US-ASCII`, name: `part.html`},
				value: `text/html`,
			});
		const envelope: EnvelopeOfMessage = new EnvelopeOfMessage(
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		);
		const node: Rfc822RootNodeOfBodystructureOfMessage =
			new Rfc822RootNodeOfBodystructureOfMessage(
				[firstChild, secondChild],
				`description`,
				envelope,
				`base64`,
				512,
				42,
				null,
			);
		expect(Array.from(node.iterateNodes())).toStrictEqual([
			node,
			firstChild,
			secondChild,
		]);
		return;
	});
	return;
});
