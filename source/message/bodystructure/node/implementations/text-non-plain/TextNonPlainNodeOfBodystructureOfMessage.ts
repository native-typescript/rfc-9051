import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {roleOfTextNonPlainNodeOfBodystructureOfMessage} from "./role/index.ts";
export interface TextNonPlainNodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfTextNonPlainNodeOfBodystructureOfMessage
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
			readonly name: null | string;
		};
		readonly value: `text/html` | `text/xml`;
	};
	iterateNodes(): IteratorObject<
		TextNonPlainNodeOfBodystructureOfMessage<Placement>,
		void,
		void
	>;
}
