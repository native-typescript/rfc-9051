import type {SectionOfBodyOfMessage} from "../../body/index.ts";
import type {NodeOfBodystructureOfMessage} from "../node/index.ts";
export class ResultOfIteratingOfBodystructureOfMessage<
	NodeToUse extends NodeOfBodystructureOfMessage<string, string>,
> {
	public constructor(node: NodeToUse, section: SectionOfBodyOfMessage) {
		this.node = node;
		this.section = section;
	}
	public readonly node: NodeToUse;
	public readonly section: SectionOfBodyOfMessage;
}
