import {SectionOfBodyOfMessage} from "../../../../body/index.ts";
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
	placementOfRootNodeOfBodystructureOfMessage,
	type RootNodeOfBodystructureOfMessage,
} from "../root/index.ts";
export class LeafRootNodeOfBodystructureOfMessage
	implements
		LeafNodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage
		>,
		NodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage,
			typeof roleOfLeafNodeOfBodystructureOfMessage
		>,
		RootNodeOfBodystructureOfMessage<
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
	public *iterateLeafNodes(): Generator<
		ResultOfIteratingOfBodystructureOfMessage<this>,
		void,
		void
	> {
		const result: ResultOfIteratingOfBodystructureOfMessage<this> =
			new ResultOfIteratingOfBodystructureOfMessage<this>(
				this,
				new SectionOfBodyOfMessage(1),
			);
		yield result;
		return;
	}
	public *iterateNodes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly placement: typeof placementOfRootNodeOfBodystructureOfMessage =
		placementOfRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfLeafNodeOfBodystructureOfMessage =
		roleOfLeafNodeOfBodystructureOfMessage;
}
