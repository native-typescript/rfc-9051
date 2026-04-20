import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {TextNonPlainNonRootNodeOfBodystructureOfMessage} from "./TextNonPlainNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`TextNonPlainNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: TextNonPlainNonRootNodeOfBodystructureOfMessage =
			new TextNonPlainNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {charset: `UTF-8`, name: null},
				value: `text/xml`,
			});
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1);
		const result: ResultOfIteratingOfBodystructureOfMessage<
			TextNonPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			TextNonPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(node, section);
		expect(Array.from(node.iterateNodes(section))).toStrictEqual([result]);
		return;
	});
	return;
});
