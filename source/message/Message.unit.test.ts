import {EnvelopeOfMessage} from "./envelope/index.ts";
import type {FlagsOfMessage} from "./flags/index.ts";
import {Message} from "./Message.ts";
import {expect} from "expect";
import {describe, test} from "node:test";
await describe(`Message`, async function executeTests(): Promise<void> {
	await test(`constructor assigns fields`, async function executeTest(): Promise<void> {
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
		const flags: FlagsOfMessage = new Set([`\\Seen`, `custom`]);
		const body: Uint8Array<ArrayBuffer> = new Uint8Array([1, 2, 3]);
		const internalDate: Date = new Date(`2024-01-01T00:00:00Z`);
		const message: Message<Uint8Array<ArrayBuffer>> = new Message<
			Uint8Array<ArrayBuffer>
		>(body, null, envelope, flags, internalDate, 123);
		expect(message.body).toBe(body);
		expect(message.bodystructure).toBeNull();
		expect(message.envelope).toBe(envelope);
		expect(message.flags).toBe(flags);
		expect(message.internaldate).toBe(internalDate);
		expect(message.uid).toBe(123);
		return;
	});
	return;
});
