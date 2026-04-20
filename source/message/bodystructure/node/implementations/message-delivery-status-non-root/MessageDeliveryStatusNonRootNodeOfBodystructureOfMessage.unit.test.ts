import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "./MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage =
			new MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage(
				`delivery status`,
				null,
				`8bit`,
				{
					parameters: {charset: `ISO-8859-2`, name: `delivery-status.txt`},
					value: `message/delivery-status`,
				},
			);
		const section: SectionOfBodyOfMessage = new SectionOfBodyOfMessage(1);
		const result: ResultOfIteratingOfBodystructureOfMessage<
			MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(node, section);
		expect(Array.from(node.iterateNodes(section))).toStrictEqual([result]);
		return;
	});
	return;
});
