import type {
	FlagsOfMessage,
	Message,
	SectionOfBodyOfMessage,
} from "../message/index.ts";
import type {ConfigurationOfFacadeOfClientOfImap} from "./configuration/index.ts";
import {convertSearchKeysToSearchObject} from "./converting-search-keys-to-search-object/index.ts";
import type {Mailbox} from "./mailbox/index.ts";
import {runImapflow} from "./running-ImapFlow/index.ts";
import {
	schemaOfMessageWithBodyWithoutSection,
	schemaOfMessageWithBodyWithSection,
	schemaOfMessageWithoutBody,
} from "./schema-of-message/index.ts";
import type {SearchProgram} from "./search-program/index.ts";
import {StatusOfFacadeOfClientOfImap} from "./status/index.ts";
import {StoreOfFacadeOfClientOfImap} from "./store/index.ts";
import {UidOfFacadeOfClientOfImap} from "./uid/index.ts";
import {useImapflowGeneratingWithOpenedMailbox} from "./using-ImapFlow-generating-with-opened-mailbox/index.ts";
import type {rfc5322} from "@native-typescript/rfc-5322";
import type {FetchMessageObject, ImapFlow, SearchObject} from "imapflow";
import {z} from "zod";
/**
 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing [IMAP](https://pl.wikipedia.org/wiki/Internet_Message_Access_Protocol) commands. You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
 */
export class FacadeOfClientOfImap {
	public constructor(configuration: ConfigurationOfFacadeOfClientOfImap) {
		this.configuration = configuration;
		this.status = new StatusOfFacadeOfClientOfImap(configuration);
		this.store = new StoreOfFacadeOfClientOfImap(configuration);
		this.uid = new UidOfFacadeOfClientOfImap(configuration);
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-append-command
	 */
	public async append(
		mailboxName: Mailbox,
		flags: FlagsOfMessage | null,
		date: Date | null,
		messageLiteral: rfc5322.Message,
	): Promise<void> {
		await runImapflow(
			this.configuration,
			async function appendToMailbox(client: ImapFlow): Promise<void> {
				await client.append(
					mailboxName,
					messageLiteral.serialize(),
					flags === null ? undefined : Array.from(flags),
					date === null ? undefined : date,
				);
				return;
			},
		);
		return;
	}
	private readonly configuration: ConfigurationOfFacadeOfClientOfImap;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-search-command
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-fetch-command
	 */
	public async *searchThenFetchWithBodyWithoutSection(
		mailboxName: Mailbox,
		searchProgram: SearchProgram,
	): AsyncGenerator<Message<rfc5322.Message>, void, void> {
		const messages: AsyncIterable<
			Message<rfc5322.Message>,
			void,
			void
		> = useImapflowGeneratingWithOpenedMailbox<Message<rfc5322.Message>>(
			this.configuration,
			mailboxName,
			async function* fetchMessagesWithBodyWithoutSection(
				client: ImapFlow,
			): AsyncGenerator<Message<rfc5322.Message>, void, void> {
				const searchObject: SearchObject =
					convertSearchKeysToSearchObject(searchProgram);
				const uids: readonly number[] = z
					.array(z.number())
					.parse(await client.search(searchObject, {uid: true}));
				const rawMessages: AsyncIterable<FetchMessageObject, void, void> =
					client.fetch(
						Array.from<number>(uids),
						{
							bodyStructure: true,
							envelope: true,
							flags: true,
							headers: true,
							internalDate: true,
							source: true,
							uid: true,
						},
						{uid: true},
					);
				for await (const rawMessage of rawMessages) {
					const message: Message<rfc5322.Message> =
						schemaOfMessageWithBodyWithoutSection.parse(rawMessage);
					yield message;
					continue;
				}
				return;
			},
		);
		for await (const message of messages) {
			yield message;
			continue;
		}
		return;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-search-command
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-fetch-command
	 */
	public searchThenFetchWithBodyWithSection(
		mailboxName: Mailbox,
		searchProgram: SearchProgram,
		sectionOfBody: SectionOfBodyOfMessage,
	): AsyncIteratorObject<Message<Uint8Array<ArrayBuffer>>, void, void>;
	public async *searchThenFetchWithBodyWithSection(
		mailboxName: Mailbox,
		searchProgram: SearchProgram,
		sectionOfBody: SectionOfBodyOfMessage,
	): AsyncGenerator<Message<Uint8Array<ArrayBuffer>>, void, void> {
		const messages: AsyncIterable<
			Message<Uint8Array<ArrayBuffer>>,
			void,
			void
		> = useImapflowGeneratingWithOpenedMailbox<
			Message<Uint8Array<ArrayBuffer>>
		>(
			this.configuration,
			mailboxName,
			async function* fetchMessagesWithBodyWithSection(
				client: ImapFlow,
			): AsyncGenerator<Message<Uint8Array<ArrayBuffer>>> {
				const searchObject: SearchObject =
					convertSearchKeysToSearchObject(searchProgram);
				const uids: readonly number[] = z
					.array(z.number())
					.parse(await client.search(searchObject, {uid: true}));
				const rawMessages: AsyncIterable<FetchMessageObject, void, void> =
					client.fetch(
						Array.from<number>(uids),
						{
							bodyParts: [sectionOfBody.serialize()],
							bodyStructure: true,
							envelope: true,
							flags: true,
							headers: true,
							internalDate: true,
							source: false,
							uid: true,
						},
						{uid: true},
					);
				for await (const rawMessage of rawMessages) {
					const message: Message<Uint8Array<ArrayBuffer>> =
						schemaOfMessageWithBodyWithSection.parse(rawMessage);
					yield message;
					continue;
				}
				return;
			},
		);
		for await (const message of messages) {
			yield message;
			continue;
		}
		return;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-search-command
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-fetch-command
	 */
	public searchThenFetchWithoutBody(
		mailboxName: Mailbox,
		searchProgram: SearchProgram,
	): AsyncIteratorObject<Message<null>, void, void>;
	public async *searchThenFetchWithoutBody(
		mailboxName: Mailbox,
		searchProgram: SearchProgram,
	): AsyncGenerator<Message<null>, void, void> {
		const messages: AsyncIterable<
			Message<null>,
			void,
			void
		> = useImapflowGeneratingWithOpenedMailbox<Message<null>>(
			this.configuration,
			mailboxName,
			async function* fetchMessagesWithoutBody(
				client: ImapFlow,
			): AsyncGenerator<Message<null>, void, void> {
				const searchObject: SearchObject =
					convertSearchKeysToSearchObject(searchProgram);
				const uids: readonly number[] = z
					.array(z.number())
					.parse(await client.search(searchObject, {uid: true}));
				const rawMessages: AsyncIterable<FetchMessageObject, void, void> =
					client.fetch(
						Array.from<number>(uids),
						{
							bodyStructure: true,
							envelope: true,
							flags: true,
							headers: true,
							internalDate: true,
							source: false,
							uid: true,
						},
						{uid: true},
					);
				for await (const rawMessage of rawMessages) {
					const message: Message<null> =
						schemaOfMessageWithoutBody.parse(rawMessage);
					yield message;
					continue;
				}
				return;
			},
		);
		for await (const message of messages) {
			yield message;
			continue;
		}
		return;
	}
	/**
	 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing the [STATUS command](https://datatracker.ietf.org/doc/html/rfc9051#name-status-command). You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
	 */
	public readonly status: StatusOfFacadeOfClientOfImap;
	/**
	 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing the [STORE command](https://datatracker.ietf.org/doc/html/rfc9051#name-store-command). You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
	 */
	public readonly store: StoreOfFacadeOfClientOfImap;
	/**
	 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing the [UID command](https://datatracker.ietf.org/doc/html/rfc9051#name-uid-command). You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
	 */
	public readonly uid: UidOfFacadeOfClientOfImap;
}
