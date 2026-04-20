import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import {MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "../message-delivery-status-non-root/index.ts";
import {TextPlainNonRootNodeOfBodystructureOfMessage} from "../text-plain-non-root/index.ts";
import {MultipartReportRootNodeOfBodystructureOfMessage} from "./MultipartReportRootNodeOfBodystructureOfMessage.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`MultipartReportRootNodeOfBodystructureOfMessage`, async function executeTests(): Promise<void> {
	await test(`iterateNodes yields depth-first order`, async function executeTest(): Promise<void> {
		const firstChild: MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage =
			new MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage(
				null,
				null,
				`7bit`,
				{
					parameters: {charset: null, name: null},
					value: `message/delivery-status`,
				},
			);
		const secondChild: TextPlainNonRootNodeOfBodystructureOfMessage =
			new TextPlainNonRootNodeOfBodystructureOfMessage(null, null, `8bit`, {
				parameters: {charset: `US-ASCII`, format: null, name: `part.txt`},
				value: `text/plain`,
			});
		const node: MultipartReportRootNodeOfBodystructureOfMessage =
			new MultipartReportRootNodeOfBodystructureOfMessage(
				[firstChild, secondChild],
				{
					parameters: {boundary: `boundary`, reportType: `delivery-status`},
					value: `multipart/report`,
				},
			);
		const resultOfThis: ResultOfIteratingOfBodystructureOfMessage<
			MultipartReportRootNodeOfBodystructureOfMessage,
			null
		> = new ResultOfIteratingOfBodystructureOfMessage<
			MultipartReportRootNodeOfBodystructureOfMessage,
			null
		>(node, null);
		const firstChildSection: SectionOfBodyOfMessage =
			new SectionOfBodyOfMessage(1);
		const resultOfFirstChild: ResultOfIteratingOfBodystructureOfMessage<
			MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		>(firstChild, firstChildSection);
		const secondChildSection: SectionOfBodyOfMessage =
			new SectionOfBodyOfMessage(2);
		const resultOfSecondChild: ResultOfIteratingOfBodystructureOfMessage<
			TextPlainNonRootNodeOfBodystructureOfMessage,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			TextPlainNonRootNodeOfBodystructureOfMessage,
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
