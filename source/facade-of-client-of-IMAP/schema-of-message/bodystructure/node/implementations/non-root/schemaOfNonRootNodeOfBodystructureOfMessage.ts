import type {SupportedNonRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfBranchNonRootNodeOfBodystructureOfMessage} from "../branch-non-root/index.ts";
import {schemaOfLeafNonRootNodeOfBodystructureOfMessage} from "../leaf-non-root/index.ts";
import {schemaOfMessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "../message-delivery-status-non-root/index.ts";
import {schemaOfMultipartReportNonRootNodeOfBodystructureOfMessage} from "../multipart-report-non-root/index.ts";
import {schemaOfRfc822HeadersNonRootNodeOfBodystructureOfMessage} from "../RFC-822-headers-non-root/index.ts";
import {schemaOfRfc822NonRootNodeOfBodystructureOfMessage} from "../RFC-822-non-root/index.ts";
import {schemaOfTextNonPlainNonRootNodeOfBodystructureOfMessage} from "../text-non-plain-non-root/index.ts";
import {schemaOfTextPlainNonRootNodeOfBodystructureOfMessage} from "../text-plain-non-root/index.ts";
import {z} from "zod";
export const schemaOfNonRootNodeOfBodystructureOfMessage: z.ZodType<SupportedNonRootNodeOfBodystructureOfMessage> =
	z.lazy(function createNonRootNodeSchema() {
		return z.union([
			schemaOfBranchNonRootNodeOfBodystructureOfMessage,
			schemaOfLeafNonRootNodeOfBodystructureOfMessage,
			schemaOfMessageDeliveryStatusNonRootNodeOfBodystructureOfMessage,
			schemaOfMultipartReportNonRootNodeOfBodystructureOfMessage,
			schemaOfRfc822HeadersNonRootNodeOfBodystructureOfMessage,
			schemaOfRfc822NonRootNodeOfBodystructureOfMessage,
			schemaOfTextNonPlainNonRootNodeOfBodystructureOfMessage,
			schemaOfTextPlainNonRootNodeOfBodystructureOfMessage,
		]);
	});
