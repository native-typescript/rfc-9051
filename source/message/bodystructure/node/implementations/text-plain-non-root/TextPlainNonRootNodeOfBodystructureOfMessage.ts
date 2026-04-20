import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
import {
	type ContentDispositionOfTextPlainNodeOfBodystructureOfMessage,
	type ContentTransferEncodingOfTextPlainNodeOfBodystructureOfMessage,
	type ContentTypeOfTextPlainNodeOfBodystructureOfMessage,
	roleOfTextPlainNodeOfBodystructureOfMessage,
	type TextPlainNodeOfBodystructureOfMessage,
} from "../text-plain/index.ts";
export class TextPlainNonRootNodeOfBodystructureOfMessage
	implements
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfTextPlainNodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfTextPlainNodeOfBodystructureOfMessage
		>,
		TextPlainNodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
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
	public readonly contentTransferEncoding:
		| `7bit`
		| `8bit`
		| `base64`
		| `quoted-printable`;
	public readonly contentType: {
		readonly parameters: {
			readonly charset:
				| `GB18030`
				| `ISO-8859-1`
				| `ISO-8859-2`
				| `US-ASCII`
				| `UTF-8`
				| null;
			readonly format: `flowed` | null;
			readonly name: null | string;
		};
		readonly value: `text/plain`;
	};
	public *iterateNodes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly placement: typeof placementOfNonRootNodeOfBodystructureOfMessage =
		placementOfNonRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfTextPlainNodeOfBodystructureOfMessage =
		roleOfTextPlainNodeOfBodystructureOfMessage;
}
