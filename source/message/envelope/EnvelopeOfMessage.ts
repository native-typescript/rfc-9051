import type {rfc5322} from "@native-typescript/rfc-5322";
/**
 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.41
 */
export class EnvelopeOfMessage {
	public constructor(
		/**
		 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
		 */
		bcc: null | rfc5322.AddressList,
		/**
		 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
		 */
		cc: null | rfc5322.AddressList,
		date: Date | null,
		/**
		 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
		 */
		from: null | rfc5322.SupportedMailboxList,
		inReplyTo: null | readonly [rfc5322.MsgId, ...(readonly rfc5322.MsgId[])],
		messageId: null | rfc5322.MsgId,
		/**
		 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
		 */
		replyTo: null | rfc5322.AddressList,
		/**
		 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
		 */
		sender: null | rfc5322.Mailbox,
		subject: null | string,
		/**
		 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
		 */
		to: null | rfc5322.AddressList,
	) {
		this.bcc = bcc;
		this.cc = cc;
		this.date = date;
		this.from = from;
		this.inReplyTo = inReplyTo;
		this.messageId = messageId;
		this.replyTo = replyTo;
		this.sender = sender;
		this.subject = subject;
		this.to = to;
	}
	/**
	 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
	 */
	public readonly bcc: null | rfc5322.AddressList;
	/**
	 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
	 */
	public readonly cc: null | rfc5322.AddressList;
	public readonly date: Date | null;
	/**
	 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
	 */
	public readonly from: null | rfc5322.SupportedMailboxList;
	public readonly inReplyTo:
		| null
		| readonly [rfc5322.MsgId, ...(readonly rfc5322.MsgId[])];
	public readonly messageId: null | rfc5322.MsgId;
	/**
	 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
	 */
	public readonly replyTo: null | rfc5322.AddressList;
	/**
	 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
	 */
	public readonly sender: null | rfc5322.Mailbox;
	public readonly subject: null | string;
	/**
	 * According to https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.42.3 the envelope can't differentiate between NameAddr with no display name and AddrSpec. The decision here is to use AddrSpec and to use the generic parameter to indicate that the display name is never null.
	 */
	public readonly to: null | rfc5322.AddressList;
}
