import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {NonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import type {roleOfBranchNodeOfBodystructureOfMessage} from "./role/index.ts";
export interface BranchNodeOfBodystructureOfMessage<
	Placement extends string,
> extends NodeOfBodystructureOfMessage<
	Placement,
	typeof roleOfBranchNodeOfBodystructureOfMessage
> {
	readonly childNodes: readonly [
		NonRootNodeOfBodystructureOfMessage<string>,
		...(readonly NonRootNodeOfBodystructureOfMessage<string>[]),
	];
	readonly contentType: {
		readonly parameters: {readonly boundary: string};
		readonly value:
			| `multipart/alternative`
			| `multipart/mixed`
			| `multipart/related`;
	};
	iterateNodes(): IteratorObject<
		| BranchNodeOfBodystructureOfMessage<Placement>
		| NonRootNodeOfBodystructureOfMessage<string>,
		void,
		void
	>;
}
