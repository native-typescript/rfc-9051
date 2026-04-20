import {EnvelopeOfMessage} from "./EnvelopeOfMessage.ts";
import {rfc5322} from "@native-typescript/rfc-5322";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`EnvelopeOfMessage`, async function executeTests(): Promise<void> {
	await test(`constructor assigns fields`, async function executeTest(): Promise<void> {
		const addressList: rfc5322.AddressList = new rfc5322.AddressList(
			new rfc5322.AddrSpec(`alice`, `example.com`),
		);
		const from: rfc5322.WithJustOneMailboxMailboxList =
			new rfc5322.WithJustOneMailboxMailboxList(
				new rfc5322.AddrSpec(`from`, `example.com`),
			);
		const sender: rfc5322.AddrSpec = new rfc5322.AddrSpec(
			`sender`,
			`example.com`,
		);
		const messageId: rfc5322.MsgId = new rfc5322.MsgId(`left`, `right`);
		const date: Date = new Date(`2024-01-02T00:00:00Z`);
		const envelope: EnvelopeOfMessage = new EnvelopeOfMessage(
			addressList,
			addressList,
			date,
			from,
			[messageId],
			messageId,
			addressList,
			sender,
			`Subject`,
			addressList,
		);
		expect(envelope.bcc).toBe(addressList);
		expect(envelope.cc).toBe(addressList);
		expect(envelope.date).toBe(date);
		expect(envelope.from).toBe(from);
		expect(envelope.inReplyTo).toStrictEqual([messageId]);
		expect(envelope.messageId).toBe(messageId);
		expect(envelope.replyTo).toBe(addressList);
		expect(envelope.sender).toBe(sender);
		expect(envelope.subject).toBe(`Subject`);
		expect(envelope.to).toBe(addressList);
		return;
	});
	return;
});
