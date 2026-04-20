import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	placementOfRootNodeOfBodystructureOfMessage,
	type RootNodeOfBodystructureOfMessage,
} from "../root/index.ts";
import {
	type ContentDispositionOfTextPlainNodeOfBodystructureOfMessage,
	type ContentTransferEncodingOfTextPlainNodeOfBodystructureOfMessage,
	type ContentTypeOfTextPlainNodeOfBodystructureOfMessage,
	roleOfTextPlainNodeOfBodystructureOfMessage,
	type TextPlainNodeOfBodystructureOfMessage,
} from "../text-plain/index.ts";
export class TextPlainRootNodeOfBodystructureOfMessage
	implements
		NodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage,
			typeof roleOfTextPlainNodeOfBodystructureOfMessage
		>,
		RootNodeOfBodystructureOfMessage<
			typeof roleOfTextPlainNodeOfBodystructureOfMessage
		>,
		TextPlainNodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage
		>
{
	public constructor(
		contentDescription: null | string,
		contentDisposition: ContentDispositionOfTextPlainNodeOfBodystructureOfMessage | null,
		contentTransferEncoding: ContentTransferEncodingOfTextPlainNodeOfBodystructureOfMessage,
		contentType: ContentTypeOfTextPlainNodeOfBodystructureOfMessage,
	) {
		this.contentDescription = contentDescription;
		this.contentDisposition = contentDisposition;
		this.contentTransferEncoding = contentTransferEncoding;
		this.contentType = contentType;
	}
	public readonly contentDescription: null | string;
	public readonly contentDisposition: ContentDispositionOfTextPlainNodeOfBodystructureOfMessage | null;
	public readonly contentTransferEncoding: ContentTransferEncodingOfTextPlainNodeOfBodystructureOfMessage;
	public readonly contentType: ContentTypeOfTextPlainNodeOfBodystructureOfMessage;
	public *iterateNodes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly placement: typeof placementOfRootNodeOfBodystructureOfMessage =
		placementOfRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfTextPlainNodeOfBodystructureOfMessage =
		roleOfTextPlainNodeOfBodystructureOfMessage;
}
