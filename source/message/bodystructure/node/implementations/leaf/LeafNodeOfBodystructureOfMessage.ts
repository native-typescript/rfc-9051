import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {ContentDispositionOfLeafNodeOfBodystructureOfMessage} from "./content-disposition/index.ts";
import type {ContentTransferEncodingOfLeafNodeOfBodystructureOfMessage} from "./content-transfer-encoding/index.ts";
import type {ContentTypeOfLeafNodeOfBodystructureOfMessage} from "./content-type/index.ts";
import type {roleOfLeafNodeOfBodystructureOfMessage} from "./role/index.ts";
export interface LeafNodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfLeafNodeOfBodystructureOfMessage
> {
	readonly contentDisposition: ContentDispositionOfLeafNodeOfBodystructureOfMessage | null;
	readonly contentTransferEncoding: ContentTransferEncodingOfLeafNodeOfBodystructureOfMessage;
	readonly contentType: ContentTypeOfLeafNodeOfBodystructureOfMessage;
	iterateNodes(): IteratorObject<
		LeafNodeOfBodystructureOfMessage<Placement>,
		void,
		void
	>;
}
