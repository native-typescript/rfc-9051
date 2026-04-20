import type {BranchNonRootNodeOfBodystructureOfMessage} from "../../branch-non-root/index.ts";
import type {LeafNonRootNodeOfBodystructureOfMessage} from "../../leaf-non-root/index.ts";
import type {MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "../../message-delivery-status-non-root/index.ts";
import type {MultipartReportNonRootNodeOfBodystructureOfMessage} from "../../multipart-report-non-root/index.ts";
import type {Rfc822HeadersNonRootNodeOfBodystructureOfMessage} from "../../RFC-822-headers-non-root/index.ts";
import type {Rfc822NonRootNodeOfBodystructureOfMessage} from "../../RFC-822-non-root/index.ts";
import type {TextNonPlainNonRootNodeOfBodystructureOfMessage} from "../../text-non-plain-non-root/index.ts";
import type {TextPlainNonRootNodeOfBodystructureOfMessage} from "../../text-plain-non-root/index.ts";
export type SupportedNonRootNodeOfBodystructureOfMessage =
	| BranchNonRootNodeOfBodystructureOfMessage
	| LeafNonRootNodeOfBodystructureOfMessage
	| MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage
	| MultipartReportNonRootNodeOfBodystructureOfMessage
	| Rfc822HeadersNonRootNodeOfBodystructureOfMessage
	| Rfc822NonRootNodeOfBodystructureOfMessage
	| TextNonPlainNonRootNodeOfBodystructureOfMessage
	| TextPlainNonRootNodeOfBodystructureOfMessage;
