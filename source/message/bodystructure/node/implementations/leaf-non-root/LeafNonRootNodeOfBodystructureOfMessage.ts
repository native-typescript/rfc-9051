import type {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type ContentDispositionOfLeafNodeOfBodystructureOfMessage,
	type ContentTransferEncodingOfLeafNodeOfBodystructureOfMessage,
	type ContentTypeOfLeafNodeOfBodystructureOfMessage,
	type LeafNodeOfBodystructureOfMessage,
	roleOfLeafNodeOfBodystructureOfMessage,
} from "../leaf/index.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
export class LeafNonRootNodeOfBodystructureOfMessage
	implements
		LeafNodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
		>,
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfLeafNodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfLeafNodeOfBodystructureOfMessage
		>
{
	public constructor(
		contentDescription: null | string,
		contentDisposition: ContentDispositionOfLeafNodeOfBodystructureOfMessage | null,
		contentTransferEncoding: ContentTransferEncodingOfLeafNodeOfBodystructureOfMessage,
		contentType: ContentTypeOfLeafNodeOfBodystructureOfMessage,
	) {
		this.contentDescription = contentDescription;
		this.contentDisposition = contentDisposition;
		this.contentTransferEncoding = contentTransferEncoding;
		this.contentType = contentType;
	}
	public readonly contentDescription: null | string;
	public readonly contentDisposition: ContentDispositionOfLeafNodeOfBodystructureOfMessage | null;
	public readonly contentTransferEncoding: ContentTransferEncodingOfLeafNodeOfBodystructureOfMessage;
	public readonly contentType: ContentTypeOfLeafNodeOfBodystructureOfMessage;
	public *iterateNodes(
		section: SectionOfBodyOfMessage,
	): Generator<
		ResultOfIteratingOfBodystructureOfMessage<this, SectionOfBodyOfMessage>,
		void,
		void
	> {
		const result: ResultOfIteratingOfBodystructureOfMessage<
			this,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			this,
			SectionOfBodyOfMessage
		>(this, section);
		yield result;
		return;
	}
	public readonly placement: typeof placementOfNonRootNodeOfBodystructureOfMessage =
		placementOfNonRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfLeafNodeOfBodystructureOfMessage =
		roleOfLeafNodeOfBodystructureOfMessage;
}
