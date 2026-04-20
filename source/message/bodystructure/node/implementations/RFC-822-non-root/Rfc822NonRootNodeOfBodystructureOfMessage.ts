import type {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import type {EnvelopeOfMessage} from "../../../../envelope/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
	type SupportedNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
import {
	type Rfc822NodeOfBodystructureOfMessage,
	roleOfRfc822NodeOfBodystructureOfMessage,
} from "../RFC-822/index.ts";
export class Rfc822NonRootNodeOfBodystructureOfMessage
	implements
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfRfc822NodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfRfc822NodeOfBodystructureOfMessage
		>,
		Rfc822NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
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
	public *iterateNodes(
		section: SectionOfBodyOfMessage,
	): Generator<
		| ResultOfIteratingOfBodystructureOfMessage<
				SupportedNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
		  >
		| ResultOfIteratingOfBodystructureOfMessage<this, SectionOfBodyOfMessage>,
		void,
		void
	> {
		const resultOfThis: ResultOfIteratingOfBodystructureOfMessage<
			this,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			this,
			SectionOfBodyOfMessage
		>(this, section);
		yield resultOfThis;
		for (const [index, childNode] of this.childNodes.entries()) {
			const sectionOfChildNode: SectionOfBodyOfMessage = section.appendSegment(
				index + 1,
			);
			const nodesOfChildNode: Iterable<
				ResultOfIteratingOfBodystructureOfMessage<
					SupportedNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
				>,
				void,
				void
			> = childNode.iterateNodes(sectionOfChildNode);
			for (const nodeOfChildNode of nodesOfChildNode) {
				yield nodeOfChildNode;
				continue;
			}
			continue;
		}
		return;
	}
	public readonly lineCount: number;
	public readonly placement: typeof placementOfNonRootNodeOfBodystructureOfMessage =
		placementOfNonRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfRfc822NodeOfBodystructureOfMessage =
		roleOfRfc822NodeOfBodystructureOfMessage;
	public readonly size: number;
}
