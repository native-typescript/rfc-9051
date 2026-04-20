import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {EnvelopeOfMessage} from "../../../../envelope/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {TextNonPlainNonRootNodeOfBodystructureOfMessage} from "../text-non-plain-non-root/index.ts";
import {TextPlainNonRootNodeOfBodystructureOfMessage} from "../text-plain-non-root/index.ts";
import {Rfc822NonRootNodeOfBodystructureOfMessage} from "./Rfc822NonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`Rfc822NonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields depth-first order`, async function executeTest(): Promise<void> {
		const firstChild: TextPlainNonRootNodeOfBodystructureOfMessage =
			new TextPlainNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {charset: `UTF-8`, format: `flowed`, name: `first.txt`},
				value: `text/plain`,
			});
		const secondChild: TextNonPlainNonRootNodeOfBodystructureOfMessage =
			new TextNonPlainNonRootNodeOfBodystructureOfMessage(
				null,
				null,
				`quoted-printable`,
				{parameters: {charset: `ISO-8859-1`, name: null}, value: `text/xml`},
			);
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
		const node: Rfc822NonRootNodeOfBodystructureOfMessage =
			new Rfc822NonRootNodeOfBodystructureOfMessage(
				[firstChild, secondChild],
				`description`,
				envelope,
				`8bit`,
				256,
				12,
				{
					otherParameters: {},
					standardizedParameters: {filename: `message.eml`},
					value: `attachment`,
				},
			);
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1);
		const resultOfThis: ResultOfIteratingOfBodystructureOfMessage<
			Rfc822NonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			Rfc822NonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(node, section);
		const firstChildSection: SectionOfBodyOfMessage = section.appendSegment(1);
		const resultOfFirstChild: ResultOfIteratingOfBodystructureOfMessage<
			TextPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			TextPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(firstChild, firstChildSection);
		const secondChildSection: SectionOfBodyOfMessage = section.appendSegment(2);
		const resultOfSecondChild: ResultOfIteratingOfBodystructureOfMessage<
			TextNonPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			TextNonPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(secondChild, secondChildSection);
		expect(Array.from(node.iterateNodes(section))).toStrictEqual([
			resultOfThis,
			resultOfFirstChild,
			resultOfSecondChild,
		]);
		return;
	});
	return;
});
