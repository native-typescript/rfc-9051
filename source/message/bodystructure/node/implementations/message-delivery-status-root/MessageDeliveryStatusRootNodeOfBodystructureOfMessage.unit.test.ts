import {MessageDeliveryStatusRootNodeOfBodystructureOfMessage} from "./MessageDeliveryStatusRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`MessageDeliveryStatusRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields self`, async function executeTest(): Promise<void> {
		const node: MessageDeliveryStatusRootNodeOfBodystructureOfMessage =
			new MessageDeliveryStatusRootNodeOfBodystructureOfMessage(
				`delivery status`,
				{
					otherParameters: {},
					standardizedParameters: {filename: `status.txt`},
					value: `attachment`,
				},
				`base64`,
				{parameters: {charset: `GB18030`}, value: `message/delivery-status`},
			);
		expect(Array.from(node.iterateNodes())).toStrictEqual([node]);
		return;
	});
	return;
});
