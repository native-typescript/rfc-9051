import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage} from "./role/index.ts";
export interface MessageDeliveryStatusNodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage
> {
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
	readonly contentType: {
		readonly parameters: {
			readonly charset:
				| `GB18030`
				| `ISO-8859-1`
				| `ISO-8859-2`
				| `US-ASCII`
				| `UTF-8`
				| null;
		};
		readonly value: `message/delivery-status`;
	};
	iterateNodes(): IteratorObject<
		MessageDeliveryStatusNodeOfBodystructureOfMessage<Placement>,
		void,
		void
	>;
}
