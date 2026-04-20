import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type MessageDeliveryStatusNodeOfBodystructureOfMessage,
	roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage,
} from "../message-delivery-status/index.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
export class MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage
	implements
		MessageDeliveryStatusNodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
		>,
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage
		>
{
	public constructor(
		contentDescription: null | string,
		contentDisposition: null | {
			readonly otherParameters: {readonly [name: string]: string};
			readonly standardizedParameters: {readonly filename: null | string};
			readonly value: `attachment` | `inline`;
		},
		contentTransferEncoding: `7bit` | `8bit` | `base64` | `quoted-printable`,
		contentType: {
			readonly parameters: {
				readonly charset:
					| `GB18030`
					| `ISO-8859-1`
					| `ISO-8859-2`
					| `US-ASCII`
					| `UTF-8`
					| null;
				readonly name: null | string;
			};
			readonly value: `message/delivery-status`;
		},
	) {
		this.contentDescription = contentDescription;
		this.contentDisposition = contentDisposition;
		this.contentTransferEncoding = contentTransferEncoding;
		this.contentType = contentType;
	}
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
	public readonly contentType: {
		readonly parameters: {
			readonly charset:
				| `GB18030`
				| `ISO-8859-1`
				| `ISO-8859-2`
				| `US-ASCII`
				| `UTF-8`
				| null;
			readonly name: null | string;
		};
		readonly value: `message/delivery-status`;
	};
	public *iterateNodes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly placement: typeof placementOfNonRootNodeOfBodystructureOfMessage =
		placementOfNonRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage =
		roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage;
}
