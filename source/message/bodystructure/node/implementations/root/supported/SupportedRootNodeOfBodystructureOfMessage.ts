import type {BranchRootNodeOfBodystructureOfMessage} from "../../branch-root/index.ts";
import type {LeafRootNodeOfBodystructureOfMessage} from "../../leaf-root/index.ts";
import type {MessageDeliveryStatusRootNodeOfBodystructureOfMessage} from "../../message-delivery-status-root/index.ts";
import type {MultipartReportRootNodeOfBodystructureOfMessage} from "../../multipart-report-root/index.ts";
import type {Rfc822HeadersRootNodeOfBodystructureOfMessage} from "../../RFC-822-headers-root/index.ts";
import type {Rfc822RootNodeOfBodystructureOfMessage} from "../../RFC-822-root/index.ts";
import type {TextNonPlainRootNodeOfBodystructureOfMessage} from "../../text-non-plain-root/index.ts";
import type {TextPlainRootNodeOfBodystructureOfMessage} from "../../text-plain-root/index.ts";
export type SupportedRootNodeOfBodystructureOfMessage =
	| BranchRootNodeOfBodystructureOfMessage
	| LeafRootNodeOfBodystructureOfMessage
	| MessageDeliveryStatusRootNodeOfBodystructureOfMessage
	| MultipartReportRootNodeOfBodystructureOfMessage
	| Rfc822HeadersRootNodeOfBodystructureOfMessage
	| Rfc822RootNodeOfBodystructureOfMessage
	| TextNonPlainRootNodeOfBodystructureOfMessage
	| TextPlainRootNodeOfBodystructureOfMessage;
