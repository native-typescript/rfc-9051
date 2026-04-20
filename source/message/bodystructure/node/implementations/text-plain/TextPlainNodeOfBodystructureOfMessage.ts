import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {ContentDispositionOfTextPlainNodeOfBodystructureOfMessage} from "./content-disposition/index.ts";
import type {ContentTransferEncodingOfTextPlainNodeOfBodystructureOfMessage} from "./content-transfer-encoding/index.ts";
import type {ContentTypeOfTextPlainNodeOfBodystructureOfMessage} from "./content-type/index.ts";
import type {roleOfTextPlainNodeOfBodystructureOfMessage} from "./role/index.ts";
export interface TextPlainNodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfTextPlainNodeOfBodystructureOfMessage
> {
	readonly contentDisposition: ContentDispositionOfTextPlainNodeOfBodystructureOfMessage | null;
	readonly contentTransferEncoding: ContentTransferEncodingOfTextPlainNodeOfBodystructureOfMessage;
	readonly contentType: ContentTypeOfTextPlainNodeOfBodystructureOfMessage;
	iterateNodes(): IteratorObject<
		TextPlainNodeOfBodystructureOfMessage<Placement>,
		void,
		void
	>;
}
