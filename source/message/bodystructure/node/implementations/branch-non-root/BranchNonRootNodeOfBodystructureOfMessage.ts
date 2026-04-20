import type {NodeOfBodystructureOfMessage} from "../../NodeOfBodystructureOfMessage.ts";
import {
	type BranchNodeOfBodystructureOfMessage,
	roleOfBranchNodeOfBodystructureOfMessage,
} from "../branch/index.ts";
import {
	type NonRootNodeOfBodystructureOfMessage,
	placementOfNonRootNodeOfBodystructureOfMessage,
	type SupportedNonRootNodeOfBodystructureOfMessage,
} from "../non-root/index.ts";
export class BranchNonRootNodeOfBodystructureOfMessage
	implements
		BranchNodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage
		>,
		NodeOfBodystructureOfMessage<
			typeof placementOfNonRootNodeOfBodystructureOfMessage,
			typeof roleOfBranchNodeOfBodystructureOfMessage
		>,
		NonRootNodeOfBodystructureOfMessage<
			typeof roleOfBranchNodeOfBodystructureOfMessage
		>
{
	public constructor(
		childNodes: readonly [
			SupportedNonRootNodeOfBodystructureOfMessage,
			...(readonly SupportedNonRootNodeOfBodystructureOfMessage[]),
		],
		contentType: {
			readonly parameters: {readonly boundary: string};
			readonly value:
				| `multipart/alternative`
				| `multipart/mixed`
				| `multipart/related`;
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
		readonly parameters: {readonly boundary: string};
		readonly value:
			| `multipart/alternative`
			| `multipart/mixed`
			| `multipart/related`;
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
	public readonly role: typeof roleOfBranchNodeOfBodystructureOfMessage =
		roleOfBranchNodeOfBodystructureOfMessage;
}
