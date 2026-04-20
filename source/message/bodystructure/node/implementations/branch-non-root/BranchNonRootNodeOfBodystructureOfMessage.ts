import type {SectionOfBodyOfMessage} from "../../../../body/index.ts";
import {ResultOfIteratingOfBodystructureOfMessage} from "../../../result-of-iteration/index.ts";
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
	public *iterateNodes(
		section: SectionOfBodyOfMessage,
	): Generator<
		| ResultOfIteratingOfBodystructureOfMessage<
				SupportedNonRootNodeOfBodystructureOfMessage,
				SectionOfBodyOfMessage
		  >
		| ResultOfIteratingOfBodystructureOfMessage<this, SectionOfBodyOfMessage>,
		void,
		void
	> {
		const resultOfThis: ResultOfIteratingOfBodystructureOfMessage<
			this,
			SectionOfBodyOfMessage
		> = new ResultOfIteratingOfBodystructureOfMessage<
			this,
			SectionOfBodyOfMessage
		>(this, section);
		yield resultOfThis;
		for (const [index, childNode] of this.childNodes.entries()) {
			const sectionOfChildNode: SectionOfBodyOfMessage = section.appendSegment(
				index + 1,
			);
			const nodesOfChildNode: Iterable<
				ResultOfIteratingOfBodystructureOfMessage<
					SupportedNonRootNodeOfBodystructureOfMessage,
					SectionOfBodyOfMessage
				>,
				void,
				void
			> = childNode.iterateNodes(sectionOfChildNode);
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
