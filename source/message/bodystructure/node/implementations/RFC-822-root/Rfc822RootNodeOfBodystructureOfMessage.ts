import type {EnvelopeOfMessage} from "../../../../envelope/index.ts";
import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {SupportedNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {
	type Rfc822NodeOfBodystructureOfMessage,
	roleOfRfc822NodeOfBodystructureOfMessage,
} from "../RFC-822/index.ts";
import {
	placementOfRootNodeOfBodystructureOfMessage,
	type RootNodeOfBodystructureOfMessage,
} from "../root/index.ts";
export class Rfc822RootNodeOfBodystructureOfMessage
	implements
		NodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage,
			typeof roleOfRfc822NodeOfBodystructureOfMessage
		>,
		Rfc822NodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage
		>,
		RootNodeOfBodystructureOfMessage<
			typeof roleOfRfc822NodeOfBodystructureOfMessage
		>
{
	public constructor(
		childNodes: readonly [
			SupportedNonRootNodeOfBodystructureOfMessage,
			...(readonly SupportedNonRootNodeOfBodystructureOfMessage[]),
		],
		contentDescription: null | string,
		envelope: EnvelopeOfMessage,
		contentTransferEncoding: `7bit` | `8bit` | `base64` | `quoted-printable`,
		size: number,
		lineCount: number,
		contentDisposition: null | {
			readonly otherParameters: {readonly [name: string]: string};
			readonly standardizedParameters: {readonly filename: null | string};
			readonly value: `attachment` | `inline`;
		},
	) {
		this.childNodes = childNodes;
		this.contentDescription = contentDescription;
		this.envelope = envelope;
		this.contentTransferEncoding = contentTransferEncoding;
		this.size = size;
		this.lineCount = lineCount;
		this.contentDisposition = contentDisposition;
	}
	public readonly childNodes: readonly [
		SupportedNonRootNodeOfBodystructureOfMessage,
		...(readonly SupportedNonRootNodeOfBodystructureOfMessage[]),
	];
	public readonly contentDescription: null | string;
	public readonly contentDisposition: null | {
		readonly otherParameters: {readonly [name: string]: string};
		readonly standardizedParameters: {readonly filename: null | string};
		readonly value: `attachment` | `inline`;
	};
	public readonly contentTransferEncoding:
		| `7bit`
		| `8bit`
		| `base64`
		| `quoted-printable`;
	public readonly envelope: EnvelopeOfMessage;
	public *iterateNodes(): Generator<
		SupportedNonRootNodeOfBodystructureOfMessage | this,
		void,
		void
	> {
		yield this;
		for (const childNode of this.childNodes) {
			const nodesOfChildNode: Iterable<SupportedNonRootNodeOfBodystructureOfMessage> =
				childNode.iterateNodes();
			for (const nodeOfChildNode of nodesOfChildNode) {
				yield nodeOfChildNode;
				continue;
			}
			continue;
		}
		return;
	}
	public readonly lineCount: number;
	public readonly placement: typeof placementOfRootNodeOfBodystructureOfMessage =
		placementOfRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfRfc822NodeOfBodystructureOfMessage =
		roleOfRfc822NodeOfBodystructureOfMessage;
	public readonly size: number;
}
