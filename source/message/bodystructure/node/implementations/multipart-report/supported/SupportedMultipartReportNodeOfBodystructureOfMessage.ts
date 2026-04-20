import type {MultipartReportNonRootNodeOfBodystructureOfMessage} from "../../multipart-report-non-root/index.ts";
import type {MultipartReportRootNodeOfBodystructureOfMessage} from "../../multipart-report-root/index.ts";
export type SupportedMultipartReportNodeOfBodystructureOfMessage =
	| MultipartReportNonRootNodeOfBodystructureOfMessage
	| MultipartReportRootNodeOfBodystructureOfMessage;
