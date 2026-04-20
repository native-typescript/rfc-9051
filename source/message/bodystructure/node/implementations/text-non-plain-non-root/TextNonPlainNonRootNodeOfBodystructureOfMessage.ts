import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
import {
	roleOfTextNonPlainNodeOfBodystructureOfMessage,
	type TextNonPlainNodeOfBodystructureOfMessage,
} from "../text-non-plain/index.ts";
export class TextNonPlainNonRootNodeOfBodystructureOfMessage
	implements
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfTextNonPlainNodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfTextNonPlainNodeOfBodystructureOfMessage
		>,
		TextNonPlainNodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
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
			readonly value: `text/html` | `text/xml`;
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
		readonly value: `text/html` | `text/xml`;
	};
	public *iterateNodes(): Generator<this, void, void> {
		yield this;
		return;
	}
	public readonly placement: typeof placementOfNonRootNodeOfBodystructureOfMessage =
		placementOfNonRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfTextNonPlainNodeOfBodystructureOfMessage =
		roleOfTextNonPlainNodeOfBodystructureOfMessage;
}
