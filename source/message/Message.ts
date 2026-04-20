import type {BodyOfMessage} from "./body/index.ts";
import type {BodystructureOfMessage} from "./bodystructure/index.ts";
import type {EnvelopeOfMessage} from "./envelope/index.ts";
import type {FlagsOfMessage} from "./flags/index.ts";
/**
 * https://datatracker.ietf.org/doc/html/rfc9051
 */
export class Message<BodyToUse extends BodyOfMessage> {
	public constructor(
		/**
		 * https://datatracker.ietf.org/doc/html/rfc9051#name-message-texts
		 * https://datatracker.ietf.org/doc/html/rfc5322
		 */
		body: BodyToUse,
		/**
		 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.9
		 */
		bodystructure: BodystructureOfMessage | null,
		/**
		 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.41
		 */
		envelope: EnvelopeOfMessage,
		/**
		 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.43
		 */
		flags: FlagsOfMessage,
		/**
		 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.45
		 */
		internaldate: Date,
		/**
		 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.49
		 */
		uid: number,
	) {
		this.body = body;
		this.bodystructure = bodystructure;
		this.envelope = envelope;
		this.flags = flags;
		this.internaldate = internaldate;
		this.uid = uid;
	}
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#name-message-texts
	 * https://datatracker.ietf.org/doc/html/rfc5322
	 */
	public readonly body: BodyToUse;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.9
	 */
	public readonly bodystructure: BodystructureOfMessage | null;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.41
	 */
	public readonly envelope: EnvelopeOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.43
	 */
	public readonly flags: FlagsOfMessage;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.45
	 */
	public readonly internaldate: Date;
	/**
	 * https://datatracker.ietf.org/doc/html/rfc9051#section-7.5.2-4.49
	 */
	public readonly uid: number;
}
