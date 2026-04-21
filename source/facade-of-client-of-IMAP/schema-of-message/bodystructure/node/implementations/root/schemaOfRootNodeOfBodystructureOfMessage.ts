import type {SupportedRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfBranchRootNodeOfBodystructureOfMessage} from "../branch-root/index.ts";
import {schemaOfLeafRootNodeOfBodystructureOfMessage} from "../leaf-root/index.ts";
import {schemaOfMessageDeliveryStatusRootNodeOfBodystructureOfMessage} from "../message-delivery-status-root/index.ts";
import {schemaOfMultipartReportRootNodeOfBodystructureOfMessage} from "../multipart-report-root/index.ts";
import {schemaOfRfc822HeadersRootNodeOfBodystructureOfMessage} from "../RFC-822-headers-root/index.ts";
import {schemaOfRfc822RootNodeOfBodystructureOfMessage} from "../RFC-822-root/index.ts";
import {schemaOfTextNonPlainRootNodeOfBodystructureOfMessage} from "../text-non-plain-root/index.ts";
import {schemaOfTextPlainRootNodeOfBodystructureOfMessage} from "../text-plain-root/index.ts";
import {z} from "zod";
export const schemaOfRootNodeOfBodystructureOfMessage: z.ZodType<SupportedRootNodeOfBodystructureOfMessage> =
	z.lazy(function createRootNodeSchema() {
		return z.union([
			schemaOfBranchRootNodeOfBodystructureOfMessage,
			schemaOfLeafRootNodeOfBodystructureOfMessage,
			schemaOfMessageDeliveryStatusRootNodeOfBodystructureOfMessage,
			schemaOfMultipartReportRootNodeOfBodystructureOfMessage,
			schemaOfRfc822HeadersRootNodeOfBodystructureOfMessage,
			schemaOfRfc822RootNodeOfBodystructureOfMessage,
			schemaOfTextNonPlainRootNodeOfBodystructureOfMessage,
			schemaOfTextPlainRootNodeOfBodystructureOfMessage,
		]);
	});
