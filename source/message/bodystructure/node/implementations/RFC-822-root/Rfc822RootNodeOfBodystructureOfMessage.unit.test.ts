import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {EnvelopeOfMessage} from "../../../../envelope/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
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
		const resultOfThis: ResultOfIteratingOfBodystructureOfMessage<
			Rfc822RootNodeOfBodystructureOfMessage,
			null
		> = new ResultOfIteratingOfBodystructureOfMessage<
			Rfc822RootNodeOfBodystructureOfMessage,
			null
		>(node, null);
		const firstChildSection: SectionOfBodyOfMessage =
			new SectionOfBodyOfMessage(1);
		const resultOfFirstChild: ResultOfIteratingOfBodystructureOfMessage<
			TextPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			TextPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(firstChild, firstChildSection);
		const secondChildSection: SectionOfBodyOfMessage =
			new SectionOfBodyOfMessage(2);
		const resultOfSecondChild: ResultOfIteratingOfBodystructureOfMessage<
			TextNonPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			TextNonPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(secondChild, secondChildSection);
		expect(Array.from(node.iterateNodes())).toStrictEqual([
			resultOfThis,
			resultOfFirstChild,
			resultOfSecondChild,
		]);
		return;
	});
	return;
});
