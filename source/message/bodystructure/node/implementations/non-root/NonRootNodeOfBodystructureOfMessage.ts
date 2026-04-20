import type {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import type {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {placementOfNonRootNodeOfBodystructureOfMessage} from "./placement/index.ts";
export interface NonRootNodeOfBodystructureOfMessage<
	Role extends string,
> extends NodeOfBodystructureOfMessage<
	typeof placementOfNonRootNodeOfBodystructureOfMessage,
	Role
> {
	iterateNodes(
		section: SectionOfBodyOfMessage,
	): IteratorObject<
		| ResultOfIteratingOfBodystructureOfMessage<
				NonRootNodeOfBodystructureOfMessage<Role>,
				SectionOfBodyOfMessage
		  >
		| ResultOfIteratingOfBodystructureOfMessage<
				NonRootNodeOfBodystructureOfMessage<string>,
				SectionOfBodyOfMessage
		  >,
		void,
		void
	>;
}
