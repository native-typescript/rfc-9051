import {MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "../message-delivery-status-non-root/index.ts";
import {TextNonPlainNonRootNodeOfBodystructureOfMessage} from "../text-non-plain-non-root/index.ts";
import {MultipartReportNonRootNodeOfBodystructureOfMessage} from "./MultipartReportNonRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`MultipartReportNonRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields depth-first order`, async function executeTest(): Promise<void> {
		const firstChild: MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage =
			new MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage(
				null,
				{
					otherParameters: {},
					standardizedParameters: {filename: null},
					value: `inline`,
				},
				`quoted-printable`,
				{
					parameters: {charset: `UTF-8`, name: `delivery.txt`},
					value: `message/delivery-status`,
				},
			);
		const secondChild: TextNonPlainNonRootNodeOfBodystructureOfMessage =
			new TextNonPlainNonRootNodeOfBodystructureOfMessage(
				null,
				null,
				`base64`,
				{parameters: {charset: `ISO-8859-2`, name: null}, value: `text/xml`},
			);
		const node: MultipartReportNonRootNodeOfBodystructureOfMessage =
			new MultipartReportNonRootNodeOfBodystructureOfMessage(
				[firstChild, secondChild],
				{
					parameters: {boundary: `inner`, reportType: `delivery-status`},
					value: `multipart/report`,
				},
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
