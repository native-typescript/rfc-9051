import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import type {placementOfRootNodeOfBodystructureOfMessage} from "./placement/index.ts";
/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export interface RootNodeOfBodystructureOfMessage<
	Role extends string,
> extends NodeOfBodystructureOfMessage<
	typeof placementOfRootNodeOfBodystructureOfMessage,
	Role
> {}
