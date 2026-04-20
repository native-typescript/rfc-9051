import type {MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "../../message-delivery-status-non-root/index.ts";
import type {MessageDeliveryStatusRootNodeOfBodystructureOfMessage} from "../../message-delivery-status-root/index.ts";
export type SupportedMessageDeliveryStatusNodeOfBodystructureOfMessage =
	| MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage
	| MessageDeliveryStatusRootNodeOfBodystructureOfMessage;
