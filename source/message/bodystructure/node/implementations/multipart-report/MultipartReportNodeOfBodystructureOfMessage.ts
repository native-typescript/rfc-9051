import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {NonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import type {roleOfMultipartReportNodeOfBodystructureOfMessage} from "./role/index.ts";
export interface MultipartReportNodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfMultipartReportNodeOfBodystructureOfMessage
> {
	readonly childNodes: readonly [
		NonRootNodeOfBodystructureOfMessage<string>,
		...(readonly NonRootNodeOfBodystructureOfMessage<string>[]),
	];
	readonly contentType: {
		readonly parameters: {
			readonly boundary: string;
			readonly reportType: `delivery-status`;
		};
		readonly value: `multipart/report`;
	};
	iterateNodes(): IteratorObject<
		| MultipartReportNodeOfBodystructureOfMessage<Placement>
		| NonRootNodeOfBodystructureOfMessage<string>,
		void,
		void
	>;
}
