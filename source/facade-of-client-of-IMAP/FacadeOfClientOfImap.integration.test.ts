import {
	addUsersToDockerMailserver,
	anyDate,
	createUser,
	environmentOfTesting,
	getCurrentTimestampWithoutMilliseconds,
	runDockerComposeEnvironment,
	type UserById,
	waitForDockerMailserverToRememberSentRfc5322Message,
} from "../../testing/index.ts";
import {
	BranchNonRootNodeOfBodystructureOfMessage,
	BranchRootNodeOfBodystructureOfMessage,
	EnvelopeOfMessage,
	type FlagOfMessage,
	Message,
	SectionOfBodyOfMessage,
	TextNonPlainNonRootNodeOfBodystructureOfMessage,
	TextPlainNonRootNodeOfBodystructureOfMessage,
	TextPlainRootNodeOfBodystructureOfMessage,
} from "../message/index.ts";
import {FacadeOfClientOfImap} from "./FacadeOfClientOfImap.ts";
import {
	AllSearchKey,
	AnsweredSearchKey,
	FromSearchKey,
	HeaderSearchKey,
	SubjectSearchKey,
	ToSearchKey,
	UnansweredSearchKey,
	UnseenSearchKey,
} from "./search-program/index.ts";
import {NzNumberSeqNumber, SequenceSet} from "./sequence-set/index.ts";
import {rfc5322} from "@native-typescript/rfc-5322";
import {expect} from "expect";
import {describe, test} from "node:test";
import type {StartedTestContainer} from "testcontainers";
await describe(`FacadeOfClientOfImap`, async function executeTests(): Promise<void> {
	await test(
		`Fetches all messages when there are zero`,
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
					const fetchedMessages: readonly Message<null>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithoutBody(mailboxName, [
								new AllSearchKey(),
							]),
						);
					expect(fetchedMessages).toStrictEqual([]);
					return;
				},
				environmentOfTesting.configuration,
			);
		},
	);
	await test(
		`Fetches all messages when there is one`,
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
					const subjectOfMessage = `Test message` as const;
					const message: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
					);
					await facade.append(mailboxName, null, new Date(), message);
					const fetchedMessages: readonly Message<rfc5322.Message>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithoutSection(mailboxName, [
								new AllSearchKey(),
							]),
						);
					await Array.fromAsync(fetchedMessages);
					const expectedMessages = [
						new Message<rfc5322.Message>(
							message,
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
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<rfc5322.Message>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(
		`Fetches all messages when there are two`,
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
					const subjectOfMessage1 = `Test message 1` as const;
					const message1: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(subjectOfMessage1),
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
					);
					await facade.append(mailboxName, null, new Date(), message1);
					const subjectOfMessage2 = `Test message 2` as const;
					const message2: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(subjectOfMessage2),
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
					);
					await facade.append(mailboxName, null, new Date(), message2);
					const fetchedMessages: readonly Message<rfc5322.Message>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithoutSection(`INBOX`, [
								new AllSearchKey(),
							]),
						);
					const expectedMessages = [
						new Message<rfc5322.Message>(
							message1,
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
								subjectOfMessage1,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
						new Message<rfc5322.Message>(
							message2,
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
								subjectOfMessage2,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set([`\\Recent`]),
							anyDate,
							2,
						),
					] as const satisfies readonly Message<rfc5322.Message>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(
		`Fetches unseen messages`,
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
					const subjectOfMessage1 = `Unseen message 1` as const;
					const message1: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(subjectOfMessage1),
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
					);
					await facade.append(mailboxName, null, new Date(), message1);
					const subjectOfMessage2 = `Unseen message 2` as const;
					const message2: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(subjectOfMessage2),
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
					);
					await facade.append(mailboxName, null, new Date(), message2);
					await facade.store.plusFlags(
						mailboxName,
						new SequenceSet([new NzNumberSeqNumber(1)]),
						new Set([`\\Seen`]),
					);
					const fetchedMessages: readonly Message<rfc5322.Message>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithoutSection(mailboxName, [
								new UnseenSearchKey(),
							]),
						);
					expect(fetchedMessages).toHaveLength(1);
					expect(fetchedMessages[0]?.uid).toBe(2);
					expect(fetchedMessages[0]?.envelope.subject).toBe(subjectOfMessage2);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(
		`Fetches by Message-ID when there are two messages`,
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
					const idOfMessage1: rfc5322.MsgId = new rfc5322.MsgId(
						`3cc7d10b-80b9-43a8-bdd9-2d777716fcea`,
						`ztrans.pl`,
					);
					const message1: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.MessageId(idOfMessage1),
								null,
							),
							new rfc5322.InformationalFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.Subject(`Message-ID test 1`),
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
					);
					await facade.append(mailboxName, null, new Date(), message1);
					const idOfMessage2: rfc5322.MsgId = new rfc5322.MsgId(
						`3eeccb14-742b-402d-bd02-f0f15a00395c`,
						`ztrans.pl`,
					);
					const message2: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.MessageId(idOfMessage2),
								null,
							),
							new rfc5322.InformationalFieldsOfHeadersOfMessage(
								null,
								null,
								new rfc5322.Subject(`Message-ID test 2`),
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
					);
					await facade.append(mailboxName, null, new Date(), message2);
					const fetchedMessages: readonly Message<rfc5322.Message>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithoutSection(mailboxName, [
								new HeaderSearchKey(`Message-ID`, idOfMessage1.serialize()),
							]),
						);
					const expectedMessages = [
						new Message<rfc5322.Message>(
							message1,
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
								idOfMessage1,
								new rfc5322.AddressList(users.sender.address),
								users.sender.address,
								`Message-ID test 1`,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<rfc5322.Message>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(`Polish characters are handled correctly`, async function executeTest(): Promise<void> {
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
				const messageSubject = `Zażółć gęślą jaźń` as const;
				const message: rfc5322.Message = new rfc5322.WithoutBodyMessage(
					new rfc5322.HeadersOfMessage(
						new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
							null,
							null,
							new rfc5322.To(new rfc5322.AddressList(users.recipient.address)),
						),
						new rfc5322.IdentificationFieldsOfHeadersOfMessage(
							null,
							null,
							null,
						),
						new rfc5322.InformationalFieldsOfHeadersOfMessage(
							null,
							null,
							new rfc5322.Subject(messageSubject),
						),
						new rfc5322.OptionalFieldsOfHeadersOfMessage(),
						new rfc5322.OrigDate(getCurrentTimestampWithoutMilliseconds()),
						new rfc5322.WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
							new rfc5322.From(
								new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
							),
							null,
							new rfc5322.Sender(users.sender.address),
						),
						new rfc5322.ResentFieldsOfHeadersOfMessage(),
						new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
					),
				);
				await facade.append(mailboxName, null, new Date(), message);
				const fetchedMessages: readonly Message<rfc5322.Message>[] =
					await Array.fromAsync(
						facade.searchThenFetchWithBodyWithoutSection(mailboxName, [
							new AllSearchKey(),
						]),
					);
				const expectedMessages = [
					new Message<rfc5322.Message>(
						message,
						new TextPlainRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
							parameters: {charset: `US-ASCII`, format: null, name: null},
							value: `text/plain`,
						}),
						new EnvelopeOfMessage(
							null,
							null,
							anyDate,
							new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
							null,
							null,
							new rfc5322.AddressList(users.sender.address),
							users.sender.address,
							messageSubject,
							new rfc5322.AddressList(users.recipient.address),
						),
						new Set([`\\Recent`]),
						anyDate,
						1,
					),
				] as const satisfies readonly Message<rfc5322.Message>[];
				expect(fetchedMessages).toStrictEqual(expectedMessages);
				return;
			},
			environmentOfTesting.configuration,
		);
		return;
	});
	await test(
		`Checking the status works when there are no messages`,
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
					const fetchedStatus: number =
						await facade.status.messages(mailboxName);
					const expectedStatus = 0 as const;
					expect(fetchedStatus).toStrictEqual(expectedStatus);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(
		`Fetches bodystructure for a multipart message`,
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
					const subjectOfMessage = `Multipart message` as const;
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
							new rfc5322.OptionalFieldsOfHeadersOfMessage(
								new rfc5322.HeaderOfMessage(
									`Content-Type`,
									`multipart/mixed; boundary="boundary1"`,
								),
								new rfc5322.HeaderOfMessage(`MIME-Version`, `1.0`),
							),
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
						`--boundary1\r
Content-Type: multipart/alternative; boundary="boundary2"\r
\r
--boundary2\r
Content-Type: text/plain; charset="UTF-8"\r
\r
Hello,\r
This is the plain text version of the email.\r
\r
--boundary2\r
Content-Type: text/html; charset="UTF-8"\r
\r
<html>\r
<body>\r
<p>Hello,</p>\r
<p>This is the <b>HTML</b> version of the email.</p>\r
</body>\r
</html>\r
--boundary2--\r
\r
--boundary1\r
Content-Type: text/plain; name="attachment.txt"\r
Content-Disposition: attachment; filename="attachment.txt"\r
Content-Transfer-Encoding: base64\r
\r
SGVsbG8sIHRoaXMgaXMgYW4gYXR0YWNobWVudCBmaWxlLg==\r
\r
--boundary1--\r
`,
					);
					await facade.append(mailboxName, null, new Date(), message);
					const fetchedMessages: readonly Message<rfc5322.Message>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithoutSection(mailboxName, [
								new AllSearchKey(),
							]),
						);
					const expectedMessages = [
						new Message<rfc5322.Message>(
							message,
							new BranchRootNodeOfBodystructureOfMessage(
								[
									new BranchNonRootNodeOfBodystructureOfMessage(
										[
											new TextPlainNonRootNodeOfBodystructureOfMessage(
												null,
												null,
												`7bit`,
												{
													parameters: {
														charset: `UTF-8`,
														format: null,
														name: null,
													},
													value: `text/plain`,
												},
											),
											new TextNonPlainNonRootNodeOfBodystructureOfMessage(
												null,
												null,
												`7bit`,
												{
													parameters: {charset: `UTF-8`, name: null},
													value: `text/html`,
												},
											),
										],
										{
											parameters: {boundary: `boundary2`},
											value: `multipart/alternative`,
										},
									),
									new TextPlainNonRootNodeOfBodystructureOfMessage(
										null,
										{
											otherParameters: {},
											standardizedParameters: {filename: `attachment.txt`},
											value: `attachment`,
										},
										`base64`,
										{
											parameters: {
												charset: `US-ASCII`,
												format: null,
												name: `attachment.txt`,
											},
											value: `text/plain`,
										},
									),
								],
								{
									parameters: {boundary: `boundary1`, type: null},
									value: `multipart/mixed`,
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
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<rfc5322.Message>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await describe(`Can fetch a part of a message`, async function executeFetchingPartOfMessageTests(): Promise<void> {
		const users = {
			recipient: createUser(
				environmentOfTesting.configuration.domain,
				`recipient`,
			),
			sender: createUser(environmentOfTesting.configuration.domain, `sender`),
		} as const satisfies UserById;
		const mailboxName = `INBOX` as const;
		const subjectOfMessage = `Multipart message` as const;
		const message: rfc5322.Message = new rfc5322.WithBodyMessage(
			new rfc5322.HeadersOfMessage(
				new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
					null,
					null,
					new rfc5322.To(new rfc5322.AddressList(users.recipient.address)),
				),
				new rfc5322.IdentificationFieldsOfHeadersOfMessage(null, null, null),
				new rfc5322.InformationalFieldsOfHeadersOfMessage(
					null,
					null,
					new rfc5322.Subject(subjectOfMessage),
				),
				new rfc5322.OptionalFieldsOfHeadersOfMessage(
					new rfc5322.HeaderOfMessage(
						`Content-Type`,
						`multipart/mixed; boundary="boundary1"`,
					),
					new rfc5322.HeaderOfMessage(`MIME-Version`, `1.0`),
				),
				new rfc5322.OrigDate(getCurrentTimestampWithoutMilliseconds()),
				new rfc5322.WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
					new rfc5322.From(
						new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
					),
					null,
					new rfc5322.Sender(users.sender.address),
				),
				new rfc5322.ResentFieldsOfHeadersOfMessage(),
				new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
			),
			`--boundary1\r
Content-Type: multipart/alternative; boundary="boundary2"\r
\r
--boundary2\r
Content-Type: text/plain; charset="UTF-8"\r
\r
Hello,\r
This is the plain text version of the email.\r
\r
--boundary2\r
Content-Type: text/html; charset="UTF-8"\r
\r
<html>\r
<body>\r
<p>Hello,</p>\r
<p>This is the <b>HTML</b> version of the email.</p>\r
</body>\r
</html>\r
--boundary2--\r
\r
--boundary1\r
Content-Type: text/plain; name="attachment.txt"\r
Content-Disposition: attachment; filename="attachment.txt"\r
Content-Transfer-Encoding: base64\r
\r
SGVsbG8sIHRoaXMgaXMgYW4gYXR0YWNobWVudCBmaWxlLg==\r
\r
--boundary1--\r
`,
		);
		await test(`shallow`, async function executeTest(): Promise<void> {
			await runDockerComposeEnvironment(
				async function doWithDockerComposeEnvironment(
					dockerMailserverDockerContainer: StartedTestContainer,
				): Promise<void> {
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
					await facade.append(mailboxName, null, new Date(), message);
					const fetchedMessages: readonly Message<Uint8Array<ArrayBuffer>>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithSection(
								mailboxName,
								[new AllSearchKey()],
								new SectionOfBodyOfMessage(1),
							),
						);
					const expectedMessages = [
						new Message<Uint8Array<ArrayBuffer>>(
							Buffer.from(
								`--boundary2\r
Content-Type: text/plain; charset="UTF-8"\r
\r
Hello,\r
This is the plain text version of the email.\r
\r
--boundary2\r
Content-Type: text/html; charset="UTF-8"\r
\r
<html>\r
<body>\r
<p>Hello,</p>\r
<p>This is the <b>HTML</b> version of the email.</p>\r
</body>\r
</html>\r
--boundary2--\r
`,
								`utf-8`,
							),
							new BranchRootNodeOfBodystructureOfMessage(
								[
									new BranchNonRootNodeOfBodystructureOfMessage(
										[
											new TextPlainNonRootNodeOfBodystructureOfMessage(
												null,
												null,
												`7bit`,
												{
													parameters: {
														charset: `UTF-8`,
														format: null,
														name: null,
													},
													value: `text/plain`,
												},
											),
											new TextNonPlainNonRootNodeOfBodystructureOfMessage(
												null,
												null,
												`7bit`,
												{
													parameters: {charset: `UTF-8`, name: null},
													value: `text/html`,
												},
											),
										],
										{
											parameters: {boundary: `boundary2`},
											value: `multipart/alternative`,
										},
									),
									new TextPlainNonRootNodeOfBodystructureOfMessage(
										null,
										{
											otherParameters: {},
											standardizedParameters: {filename: `attachment.txt`},
											value: `attachment`,
										},
										`base64`,
										{
											parameters: {
												charset: `US-ASCII`,
												format: null,
												name: `attachment.txt`,
											},
											value: `text/plain`,
										},
									),
								],
								{
									parameters: {boundary: `boundary1`, type: null},
									value: `multipart/mixed`,
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
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<Uint8Array<ArrayBuffer>>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		});
		await test(`deep`, async function executeTest(): Promise<void> {
			await runDockerComposeEnvironment(
				async function doWithDockerComposeEnvironment(
					dockerMailserverDockerContainer: StartedTestContainer,
				): Promise<void> {
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
					await facade.append(mailboxName, null, new Date(), message);
					const fetchedMessages: readonly Message<Uint8Array<ArrayBuffer>>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithSection(
								mailboxName,
								[new AllSearchKey()],
								new SectionOfBodyOfMessage(1, 1),
							),
						);
					const expectedMessages = [
						new Message<Uint8Array<ArrayBuffer>>(
							Buffer.from(
								`Hello,\r
This is the plain text version of the email.\r
`,
								`utf-8`,
							),
							new BranchRootNodeOfBodystructureOfMessage(
								[
									new BranchNonRootNodeOfBodystructureOfMessage(
										[
											new TextPlainNonRootNodeOfBodystructureOfMessage(
												null,
												null,
												`7bit`,
												{
													parameters: {
														charset: `UTF-8`,
														format: null,
														name: null,
													},
													value: `text/plain`,
												},
											),
											new TextNonPlainNonRootNodeOfBodystructureOfMessage(
												null,
												null,
												`7bit`,
												{
													parameters: {charset: `UTF-8`, name: null},
													value: `text/html`,
												},
											),
										],
										{
											parameters: {boundary: `boundary2`},
											value: `multipart/alternative`,
										},
									),
									new TextPlainNonRootNodeOfBodystructureOfMessage(
										null,
										{
											otherParameters: {},
											standardizedParameters: {filename: `attachment.txt`},
											value: `attachment`,
										},
										`base64`,
										{
											parameters: {
												charset: `US-ASCII`,
												format: null,
												name: `attachment.txt`,
											},
											value: `text/plain`,
										},
									),
								],
								{
									parameters: {boundary: `boundary1`, type: null},
									value: `multipart/mixed`,
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
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<Uint8Array<ArrayBuffer>>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		});
		return;
	});
	await test(
		`Can fetch a part when bodystructure is a single leaf root node`,
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
					const subjectOfMessage = `Single part message` as const;
					const bodyOfMessage = `This is the body of the test message.\r
` as const;
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
						bodyOfMessage,
					);
					await facade.append(mailboxName, null, new Date(), message);
					const fetchedMessages: readonly Message<Uint8Array<ArrayBuffer>>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithBodyWithSection(
								mailboxName,
								[new AllSearchKey()],
								new SectionOfBodyOfMessage(1),
							),
						);
					const expectedMessages = [
						new Message<Uint8Array<ArrayBuffer>>(
							Buffer.from(bodyOfMessage, `utf-8`),
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
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<Uint8Array<ArrayBuffer>>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(`Can fetch ignoring the body`, async function executeTest(): Promise<void> {
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
				const subjectOfMessage = `Test message` as const;
				const message: rfc5322.Message = new rfc5322.WithBodyMessage(
					new rfc5322.HeadersOfMessage(
						new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
							null,
							null,
							new rfc5322.To(new rfc5322.AddressList(users.recipient.address)),
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
								new rfc5322.WithJustOneMailboxMailboxList(users.sender.address),
							),
							null,
							new rfc5322.Sender(users.sender.address),
						),
						new rfc5322.ResentFieldsOfHeadersOfMessage(),
						new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
					),
					`This is the body of the test message.\r
`,
				);
				await facade.append(mailboxName, null, new Date(), message);
				const fetchedMessages: readonly Message<null>[] = await Array.fromAsync(
					facade.searchThenFetchWithoutBody(mailboxName, [new AllSearchKey()]),
				);
				const expectedMessages = [
					new Message<null>(
						null,
						new TextPlainRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
							parameters: {charset: `US-ASCII`, format: null, name: null},
							value: `text/plain`,
						}),
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
						new Set([`\\Recent`]),
						anyDate,
						1,
					),
				] as const satisfies readonly Message<null>[];
				expect(fetchedMessages).toStrictEqual(expectedMessages);
				return;
			},
			environmentOfTesting.configuration,
		);
		return;
	});
	await test(`Can fetch answered emails`, async function executeTest(): Promise<void> {
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
				const subjectOfMessage = `Test message` as const;
				const messageToBeAnswered: rfc5322.Message =
					new rfc5322.WithoutBodyMessage(
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
					);
				await facade.append(mailboxName, null, new Date(), messageToBeAnswered);
				await waitForDockerMailserverToRememberSentRfc5322Message();
				await facade.store.plusFlags(
					mailboxName,
					new SequenceSet([new NzNumberSeqNumber(1)]),
					new Set<FlagOfMessage>([`\\Answered`]),
				);
				await waitForDockerMailserverToRememberSentRfc5322Message();
				const messageToNotBeAnswered: rfc5322.Message =
					new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(`Another test message`),
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
					);
				await facade.append(
					mailboxName,
					null,
					new Date(),
					messageToNotBeAnswered,
				);
				await waitForDockerMailserverToRememberSentRfc5322Message();
				const fetchedMessages: readonly Message<null>[] = await Array.fromAsync(
					facade.searchThenFetchWithoutBody(mailboxName, [
						new AnsweredSearchKey(),
					]),
				);
				const expectedMessages = [
					new Message<null>(
						null,
						new TextPlainRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
							parameters: {charset: `US-ASCII`, format: null, name: null},
							value: `text/plain`,
						}),
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
						new Set<FlagOfMessage>([`\\Answered`]),
						anyDate,
						1,
					),
				] as const satisfies readonly Message<null>[];
				expect(fetchedMessages).toStrictEqual(expectedMessages);
				return;
			},
			environmentOfTesting.configuration,
		);
		return;
	});
	await test(`Can fetch unanswered emails`, async function executeTest(): Promise<void> {
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
				const subjectOfMessage = `Test message` as const;
				const messageToNotBeAnswered: rfc5322.Message =
					new rfc5322.WithoutBodyMessage(
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
					);
				await facade.append(
					mailboxName,
					null,
					new Date(),
					messageToNotBeAnswered,
				);
				await waitForDockerMailserverToRememberSentRfc5322Message();
				const messageToBeAnswered: rfc5322.Message =
					new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(`Another test message`),
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
					);
				await facade.append(mailboxName, null, new Date(), messageToBeAnswered);
				await waitForDockerMailserverToRememberSentRfc5322Message();
				await facade.store.plusFlags(
					mailboxName,
					new SequenceSet([new NzNumberSeqNumber(2)]),
					new Set<FlagOfMessage>([`\\Answered`]),
				);
				await waitForDockerMailserverToRememberSentRfc5322Message();
				const fetchedMessages: readonly Message<null>[] = await Array.fromAsync(
					facade.searchThenFetchWithoutBody(mailboxName, [
						new UnansweredSearchKey(),
					]),
				);
				const expectedMessages = [
					new Message<null>(
						null,
						new TextPlainRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
							parameters: {charset: `US-ASCII`, format: null, name: null},
							value: `text/plain`,
						}),
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
				expect(fetchedMessages).toStrictEqual(expectedMessages);
				return;
			},
			environmentOfTesting.configuration,
		);
		return;
	});
	await test(`Fetches only the message from specific sender among multiple emails`, async function executeTest(): Promise<void> {
		await runDockerComposeEnvironment(
			async function doWithDockerComposeEnvironment(
				dockerMailserverDockerContainer: StartedTestContainer,
			): Promise<void> {
				const users = {
					recipient: createUser(
						environmentOfTesting.configuration.domain,
						`recipient`,
					),
					sender1: createUser(
						environmentOfTesting.configuration.domain,
						`sender1`,
					),
					sender2: createUser(
						environmentOfTesting.configuration.domain,
						`sender2`,
					),
					sender3: createUser(
						environmentOfTesting.configuration.domain,
						`sender3`,
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
				const emailsToSend = [
					{sender: users.sender1, subject: `Email from sender 1`},
					{sender: users.sender2, subject: `Email from sender 2`},
					{sender: users.sender3, subject: `Email from sender 3`},
				] as const;
				for (const emailConfig of emailsToSend) {
					const message: rfc5322.Message = new rfc5322.WithoutBodyMessage(
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
								new rfc5322.Subject(emailConfig.subject),
							),
							new rfc5322.OptionalFieldsOfHeadersOfMessage(),
							new rfc5322.OrigDate(getCurrentTimestampWithoutMilliseconds()),
							new rfc5322.WithJustOneMailboxInFromOriginatorFieldsOfHeadersOfMessage(
								new rfc5322.From(
									new rfc5322.WithJustOneMailboxMailboxList(
										emailConfig.sender.address,
									),
								),
								null,
								new rfc5322.Sender(emailConfig.sender.address),
							),
							new rfc5322.ResentFieldsOfHeadersOfMessage(),
							new rfc5322.EmptyTraceFieldsOfHeadersOfMessage(),
						),
					);
					await facade.append(mailboxName, null, new Date(), message);
					await waitForDockerMailserverToRememberSentRfc5322Message();
				}
				const fetchedMessages: readonly Message<null>[] = await Array.fromAsync(
					facade.searchThenFetchWithoutBody(mailboxName, [
						new FromSearchKey(users.sender2.address.stringify()),
					]),
				);
				const expectedMessages = [
					new Message<null>(
						null,
						new TextPlainRootNodeOfBodystructureOfMessage(null, null, `7bit`, {
							parameters: {charset: `US-ASCII`, format: null, name: null},
							value: `text/plain`,
						}),
						new EnvelopeOfMessage(
							null,
							null,
							anyDate,
							new rfc5322.WithJustOneMailboxMailboxList(users.sender2.address),
							null,
							null,
							new rfc5322.AddressList(users.sender2.address),
							users.sender2.address,
							`Email from sender 2`,
							new rfc5322.AddressList(users.recipient.address),
						),
						new Set([`\\Recent`]),
						anyDate,
						2,
					),
				] as const satisfies readonly Message<null>[];
				expect(fetchedMessages).toStrictEqual(expectedMessages);
				return;
			},
			environmentOfTesting.configuration,
		);
		return;
	});
	await test(
		`Fetches only the message with specific subject among multiple emails`,
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
					const matchingSubject = `Matching subject` as const;
					const nonMatchingSubject = `Other subject` as const;
					const matchingMessage: rfc5322.Message =
						new rfc5322.WithoutBodyMessage(
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
									new rfc5322.Subject(matchingSubject),
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
						);
					await facade.append(mailboxName, null, new Date(), matchingMessage);
					await waitForDockerMailserverToRememberSentRfc5322Message();
					const nonMatchingMessage: rfc5322.Message =
						new rfc5322.WithoutBodyMessage(
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
									new rfc5322.Subject(nonMatchingSubject),
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
						);
					await facade.append(
						mailboxName,
						null,
						new Date(),
						nonMatchingMessage,
					);
					await waitForDockerMailserverToRememberSentRfc5322Message();
					const fetchedMessages: readonly Message<null>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithoutBody(mailboxName, [
								new SubjectSearchKey(matchingSubject),
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
								matchingSubject,
								new rfc5322.AddressList(users.recipient.address),
							),
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<null>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	await test(
		`Fetches only the message with specific recipient among multiple emails`,
		{timeout: 480000},
		async function executeTest(): Promise<void> {
			await runDockerComposeEnvironment(
				async function doWithDockerComposeEnvironment(
					dockerMailserverDockerContainer: StartedTestContainer,
				): Promise<void> {
					const users = {
						recipient1: createUser(
							environmentOfTesting.configuration.domain,
							`recipient1`,
						),
						recipient2: createUser(
							environmentOfTesting.configuration.domain,
							`recipient2`,
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
							name: users.recipient1.address.stringify(),
							password: users.recipient1.password,
						},
					});
					const mailboxName = `INBOX` as const;
					const messageToRecipient1: rfc5322.Message =
						new rfc5322.WithoutBodyMessage(
							new rfc5322.HeadersOfMessage(
								new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
									null,
									null,
									new rfc5322.To(
										new rfc5322.AddressList(users.recipient1.address),
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
									new rfc5322.Subject(`Email to recipient 1`),
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
						);
					await facade.append(
						mailboxName,
						null,
						new Date(),
						messageToRecipient1,
					);
					await waitForDockerMailserverToRememberSentRfc5322Message();
					const messageToRecipient2: rfc5322.Message =
						new rfc5322.WithoutBodyMessage(
							new rfc5322.HeadersOfMessage(
								new rfc5322.DestinationAddressFieldsOfHeadersOfMessage(
									null,
									null,
									new rfc5322.To(
										new rfc5322.AddressList(users.recipient2.address),
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
									new rfc5322.Subject(`Email to recipient 2`),
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
						);
					await facade.append(
						mailboxName,
						null,
						new Date(),
						messageToRecipient2,
					);
					await waitForDockerMailserverToRememberSentRfc5322Message();
					const fetchedMessages: readonly Message<null>[] =
						await Array.fromAsync(
							facade.searchThenFetchWithoutBody(mailboxName, [
								new ToSearchKey(users.recipient1.address.stringify()),
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
								`Email to recipient 1`,
								new rfc5322.AddressList(users.recipient1.address),
							),
							new Set([`\\Recent`]),
							anyDate,
							1,
						),
					] as const satisfies readonly Message<null>[];
					expect(fetchedMessages).toStrictEqual(expectedMessages);
					return;
				},
				environmentOfTesting.configuration,
			);
			return;
		},
	);
	return;
});
