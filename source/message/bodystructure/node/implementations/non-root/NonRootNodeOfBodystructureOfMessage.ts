import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {placementOfNonRootNodeOfBodystructureOfMessage} from "./placement/index.ts";
export interface NonRootNodeOfBodystructureOfMessage<
	Role extends string,
> extends NodeOfBodystructureOfMessage<
	typeof placementOfNonRootNodeOfBodystructureOfMessage,
	Role
> {
	iterateNodes(): IteratorObject<
		| NonRootNodeOfBodystructureOfMessage<Role>
		| NonRootNodeOfBodystructureOfMessage<string>,
		void,
		void
	>;
}
