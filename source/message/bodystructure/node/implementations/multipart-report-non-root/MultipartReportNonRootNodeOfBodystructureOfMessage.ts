import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type MultipartReportNodeOfBodystructureOfMessage,
	roleOfMultipartReportNodeOfBodystructureOfMessage,
} from "../multipart-report/index.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
	type SupportedNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
export class MultipartReportNonRootNodeOfBodystructureOfMessage
	implements
		MultipartReportNodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
		>,
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfMultipartReportNodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfMultipartReportNodeOfBodystructureOfMessage
		>
{
	public constructor(
		childNodes: readonly [
			SupportedNonRootNodeOfBodystructureOfMessage,
			...(readonly SupportedNonRootNodeOfBodystructureOfMessage[]),
		],
		contentType: {
			readonly parameters: {
				readonly boundary: string;
				readonly reportType: `delivery-status`;
			};
			readonly value: `multipart/report`;
		},
	) {
		this.childNodes = childNodes;
		this.contentType = contentType;
	}
	public readonly childNodes: readonly [
		SupportedNonRootNodeOfBodystructureOfMessage,
		...(readonly SupportedNonRootNodeOfBodystructureOfMessage[]),
	];
	public readonly contentDescription: null | string = null;
	public readonly contentType: {
		readonly parameters: {
			readonly boundary: string;
			readonly reportType: `delivery-status`;
		};
		readonly value: `multipart/report`;
	};
	public *iterateNodes(): Generator<
		SupportedNonRootNodeOfBodystructureOfMessage | this,
		void,
		void
	> {
		yield this;
		for (const childNode of this.childNodes) {
			const nodesOfChildNode: Iterable<
				SupportedNonRootNodeOfBodystructureOfMessage,
				void,
				void
			> = childNode.iterateNodes();
			for (const nodeOfChildNode of nodesOfChildNode) {
				yield nodeOfChildNode;
				continue;
			}
			continue;
		}
		return;
	}
	public readonly placement: typeof placementOfNonRootNodeOfBodystructureOfMessage =
		placementOfNonRootNodeOfBodystructureOfMessage;
	public readonly role: typeof roleOfMultipartReportNodeOfBodystructureOfMessage =
		roleOfMultipartReportNodeOfBodystructureOfMessage;
}
