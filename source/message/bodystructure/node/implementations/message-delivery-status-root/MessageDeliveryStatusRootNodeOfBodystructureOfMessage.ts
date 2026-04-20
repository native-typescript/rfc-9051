import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type MessageDeliveryStatusNodeOfBodystructureOfMessage,
	roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage,
} from "../message-delivery-status/index.ts";
import {
	placementOfRootNodeOfBodystructureOfMessage,
	type RootNodeOfBodystructureOfMessage,
} from "../root/index.ts";
export class MessageDeliveryStatusRootNodeOfBodystructureOfMessage
	implements
		MessageDeliveryStatusNodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage
		>,
		NodeOfBodystructureOfMessage<
			typeof placementOfRootNodeOfBodystructureOfMessage,
			typeof roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage
		>,
		RootNodeOfBodystructureOfMessage<
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
		};
		readonly value: `message/delivery-status`;
	};
	public *iterateNodes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly placement: typeof placementOfRootNodeOfBodystructureOfMessage =
		placementOfRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage =
		roleOfMessageDeliveryStatusNodeOfBodystructureOfMessage;
}
