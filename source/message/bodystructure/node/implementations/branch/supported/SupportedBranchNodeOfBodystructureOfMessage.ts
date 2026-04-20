import type {BranchNonRootNodeOfBodystructureOfMessage} from "../../branch-non-root/index.ts";
import type {BranchRootNodeOfBodystructureOfMessage} from "../../branch-root/index.ts";
export type SupportedBranchNodeOfBodystructureOfMessage =
	| BranchNonRootNodeOfBodystructureOfMessage
	| BranchRootNodeOfBodystructureOfMessage;
