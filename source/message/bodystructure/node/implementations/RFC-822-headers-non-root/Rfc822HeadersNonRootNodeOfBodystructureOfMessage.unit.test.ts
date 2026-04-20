import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {Rfc822HeadersNonRootNodeOfBodystructureOfMessage} from "./Rfc822HeadersNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`Rfc822HeadersNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: Rfc822HeadersNonRootNodeOfBodystructureOfMessage =
			new Rfc822HeadersNonRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
				parameters: {charset: null, name: `headers.txt`},
				value: `text/rfc822-headers`,
			});
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1);
		const result: ResultOfIteratingOfBodystructureOfMessage<
			Rfc822HeadersNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			Rfc822HeadersNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(node, section);
		expect(Array.from(node.iterateNodes(section))).toStrictEqual([result]);
		return;
	});
	return;
});
