import {
	addUsersToDockerMailserver,
	anyDate,
	createUser,
	environmentOfTesting,
	getCurrentTimestampWithoutMilliseconds,
	runDockerComposeEnvironment,
	type UserById,
} from "../../../testing/index.ts";
import {
	EnvelopeOfMessage,
	type FlagOfMessage,
	Message,
	TextPlainRootNodeOfBodystructureOfMessage,
} from "../../message/index.ts";
import {FacadeOfClientOfImap} from "../FacadeOfClientOfImap.ts";
import {AllSearchKey} from "../search-program/index.ts";
import {NzNumberSeqNumber, SequenceSet} from "../sequence-set/index.ts";
import {rfc5322} from "@native-typescript/rfc-5322";
import {expect} from "expect";
import {describe, test} from "node:test";
import type {StartedTestContainer} from "testcontainers";
await describe(`StoreOfFacadeOfClientOfImap`, async function executeTests(): Promise<void> {
	await test(
		`Sets flags`,
		{timeout: 480000},
		async function executeTest(): Promise<void> {
			await runDockerComposeEnvironment(
				async function doWithDockerComposeEnvironment(
					dockerMailserverDockerContainer: StartedTestContainer,
				): Promise<void> {
					const users = {
						recipient: createUser(
							environmentOfTesting.configuration.domain,
							`recipient`,
						),
						sender: createUser(
							environmentOfTesting.configuration.domain,
							`sender`,
						),
					} as const satisfies UserById;
					await addUsersToDockerMailserver(
						dockerMailserverDockerContainer,
						Object.values(users),
					);
					const facade: FacadeOfClientOfImap = new FacadeOfClientOfImap({
						hostname: dockerMailserverDockerContainer.getHost(),
						port: {
							isWithTls:
								environmentOfTesting.configuration.dockerMailserver.imap.port
									.isWithTls,
							number: dockerMailserverDockerContainer.getMappedPort(
								environmentOfTesting.configuration.dockerMailserver.imap.port
									.internalNumber,
							),
						},
						user: {
							name: users.recipient.address.stringify(),
							password: users.recipient.password,
						},
					});
					const mailboxName = `INBOX` as const;
					const subjectOfMessage = `Flags set test` as const;
					const message: rfc5322.Message = new rfc5322.WithBodyMessage(
						new rfc5322.HeadersOfMessage(
							new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.To(
									new rfc5322.AddressList(users.recipient.address),
								),
							),
							new rfc5322.IdentificationFieldsOfHeadersOfMessage(
								null,
								null,
								null,
							),
							new rfc5322.InformationalFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.Subject(subjectOfMessage),
							),
							new rfc5322.OptionalFieldsOfHeadersOfMessage(),
							new rfc5322.OrigDate(getCurrentTimestampWithoutMilliseconds()),
							new rfc5322.WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
								new rfc5322.From(
									new rfc5322.WithJustOneMailboxMailboxList(
										users.sender.address,
									),
								),
								null,
								new rfc5322.Sender(users.sender.address),
							),
							new rfc5322.ResentFieldsOfHeadersOfMessage(),
							new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
						),
						`This is the body of the test message.\r\n`,
					);
					await facade.append(mailboxName, null, new Date(), message);
					const sequenceSet: SequenceSet = new SequenceSet([
						new NzNumberSeqNumber(1),
					]);
					await facade.store.flags(mailboxName, sequenceSet, new Set([`Test`]));
					const updatedMessages: readonly Message<null>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithoutBody(mailboxName, [
								new AllSearchKey(),
							]),
						);
					const expectedMessages = [
						new Message<null>(
							null,
							new TextPlainRootNodeOfBodystructureOfMessage(
								null,
								null,
								`7bit`,
								{
									parameters: {charset: `US-ASCII`, format: null, name: null},
									value: `text/plain`,
								},
							),
							new EnvelopeOfMessage(
								null,
								null,
								anyDate,
								new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
								null,
								null,
								new rfc5322.AddressList(users.sender.address),
								users.sender.address,
								subjectOfMessage,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set<FlagOfMessage>([`Test`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<null>[];
					expect(updatedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
		},
	);
	await test(
		`Adds flags`,
		{timeout: 480000},
		async function executeTest(): Promise<void> {
			await runDockerComposeEnvironment(
				async function doWithDockerComposeEnvironment(
					dockerMailserverDockerContainer: StartedTestContainer,
				): Promise<void> {
					const users = {
						recipient: createUser(
							environmentOfTesting.configuration.domain,
							`recipient`,
						),
						sender: createUser(
							environmentOfTesting.configuration.domain,
							`sender`,
						),
					} as const satisfies UserById;
					await addUsersToDockerMailserver(
						dockerMailserverDockerContainer,
						Object.values(users),
					);
					const facade: FacadeOfClientOfImap = new FacadeOfClientOfImap({
						hostname: dockerMailserverDockerContainer.getHost(),
						port: {
							isWithTls:
								environmentOfTesting.configuration.dockerMailserver.imap.port
									.isWithTls,
							number: dockerMailserverDockerContainer.getMappedPort(
								environmentOfTesting.configuration.dockerMailserver.imap.port
									.internalNumber,
							),
						},
						user: {
							name: users.recipient.address.stringify(),
							password: users.recipient.password,
						},
					});
					const mailboxName = `INBOX` as const;
					const subjectOfMessage = `Flags add test` as const;
					const message: rfc5322.Message = new rfc5322.WithBodyMessage(
						new rfc5322.HeadersOfMessage(
							new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.To(
									new rfc5322.AddressList(users.recipient.address),
								),
							),
							new rfc5322.IdentificationFieldsOfHeadersOfMessage(
								null,
								null,
								null,
							),
							new rfc5322.InformationalFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.Subject(subjectOfMessage),
							),
							new rfc5322.OptionalFieldsOfHeadersOfMessage(),
							new rfc5322.OrigDate(getCurrentTimestampWithoutMilliseconds()),
							new rfc5322.WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
								new rfc5322.From(
									new rfc5322.WithJustOneMailboxMailboxList(
										users.sender.address,
									),
								),
								null,
								new rfc5322.Sender(users.sender.address),
							),
							new rfc5322.ResentFieldsOfHeadersOfMessage(),
							new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
						),
						`This is the body of the test message.\r\n`,
					);
					await facade.append(mailboxName, null, new Date(), message);
					const sequenceSet: SequenceSet = new SequenceSet([
						new NzNumberSeqNumber(1),
					]);
					const customFlag = `Test` as const;
					await facade.store.plusFlags(
						mailboxName,
						sequenceSet,
						new Set([customFlag]),
					);
					const updatedMessages: readonly Message<null>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithoutBody(mailboxName, [
								new AllSearchKey(),
							]),
						);
					const expectedMessages = [
						new Message<null>(
							null,
							new TextPlainRootNodeOfBodystructureOfMessage(
								null,
								null,
								`7bit`,
								{
									parameters: {charset: `US-ASCII`, format: null, name: null},
									value: `text/plain`,
								},
							),
							new EnvelopeOfMessage(
								null,
								null,
								anyDate,
								new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
								null,
								null,
								new rfc5322.AddressList(users.sender.address),
								users.sender.address,
								subjectOfMessage,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set<FlagOfMessage>([customFlag]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<null>[];
					expect(updatedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
		},
	);
	await test(
		`Removes flags`,
		{timeout: 480000},
		async function executeTest(): Promise<void> {
			await runDockerComposeEnvironment(
				async function doWithDockerComposeEnvironment(
					dockerMailserverDockerContainer: StartedTestContainer,
				): Promise<void> {
					const users = {
						recipient: createUser(
							environmentOfTesting.configuration.domain,
							`recipient`,
						),
						sender: createUser(
							environmentOfTesting.configuration.domain,
							`sender`,
						),
					} as const satisfies UserById;
					await addUsersToDockerMailserver(
						dockerMailserverDockerContainer,
						Object.values(users),
					);
					const facade: FacadeOfClientOfImap = new FacadeOfClientOfImap({
						hostname: dockerMailserverDockerContainer.getHost(),
						port: {
							isWithTls:
								environmentOfTesting.configuration.dockerMailserver.imap.port
									.isWithTls,
							number: dockerMailserverDockerContainer.getMappedPort(
								environmentOfTesting.configuration.dockerMailserver.imap.port
									.internalNumber,
							),
						},
						user: {
							name: users.recipient.address.stringify(),
							password: users.recipient.password,
						},
					});
					const mailboxName = `INBOX` as const;
					const subjectOfMessage = `Flags remove test` as const;
					const message: rfc5322.Message = new rfc5322.WithBodyMessage(
						new rfc5322.HeadersOfMessage(
							new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.To(
									new rfc5322.AddressList(users.recipient.address),
								),
							),
							new rfc5322.IdentificationFieldsOfHeadersOfMessage(
								null,
								null,
								null,
							),
							new rfc5322.InformationalFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.Subject(subjectOfMessage),
							),
							new rfc5322.OptionalFieldsOfHeadersOfMessage(),
							new rfc5322.OrigDate(getCurrentTimestampWithoutMilliseconds()),
							new rfc5322.WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
								new rfc5322.From(
									new rfc5322.WithJustOneMailboxMailboxList(
										users.sender.address,
									),
								),
								null,
								new rfc5322.Sender(users.sender.address),
							),
							new rfc5322.ResentFieldsOfHeadersOfMessage(),
							new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
						),
						`This is the body of the test message.\r\n`,
					);
					await facade.append(mailboxName, null, new Date(), message);
					const sequenceSet: SequenceSet = new SequenceSet([
						new NzNumberSeqNumber(1),
					]);
					const customFlag = `Test` as const;
					await facade.store.plusFlags(
						mailboxName,
						sequenceSet,
						new Set([customFlag]),
					);
					await facade.store.minusFlags(
						mailboxName,
						sequenceSet,
						new Set([customFlag]),
					);
					const updatedMessages: readonly Message<null>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithoutBody(mailboxName, [
								new AllSearchKey(),
							]),
						);
					const expectedMessages = [
						new Message<null>(
							null,
							new TextPlainRootNodeOfBodystructureOfMessage(
								null,
								null,
								`7bit`,
								{
									parameters: {charset: `US-ASCII`, format: null, name: null},
									value: `text/plain`,
								},
							),
							new EnvelopeOfMessage(
								null,
								null,
								anyDate,
								new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
								null,
								null,
								new rfc5322.AddressList(users.sender.address),
								users.sender.address,
								subjectOfMessage,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set<FlagOfMessage>(),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<null>[];
					expect(updatedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
		},
	);
	return;
});
