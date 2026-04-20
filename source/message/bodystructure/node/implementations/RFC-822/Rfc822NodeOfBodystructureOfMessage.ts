import type {EnvelopeOfMessage} from "../../../../envelope/index.ts";
import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {SupportedNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import type {roleOfRfc822NodeOfBodystructureOfMessage} from "./role/index.ts";
export interface Rfc822NodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfRfc822NodeOfBodystructureOfMessage
> {
	readonly childNodes: readonly [
		SupportedNonRootNodeOfBodystructureOfMessage,
		...(readonly SupportedNonRootNodeOfBodystructureOfMessage[]),
	];
	readonly contentDisposition: null | {
		readonly otherParameters: {readonly [name: string]: string};
		readonly standardizedParameters: {readonly filename: null | string};
		readonly value: `attachment` | `inline`;
	};
	readonly contentTransferEncoding:
		| `7bit`
		| `8bit`
		| `base64`
		| `quoted-printable`;
	readonly envelope: EnvelopeOfMessage;
	iterateNodes(): IteratorObject<
		| Rfc822NodeOfBodystructureOfMessage<Placement>
		| SupportedNonRootNodeOfBodystructureOfMessage,
		void,
		void
	>;
	readonly lineCount: number;
	readonly placement: Placement;
	readonly role: typeof roleOfRfc822NodeOfBodystructureOfMessage;
	readonly size: number;
}
