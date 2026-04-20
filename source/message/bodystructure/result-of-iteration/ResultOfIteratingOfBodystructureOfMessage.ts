import type {SectionOfBodyOfMessage} from "../../body/index.ts";
import type {NodeOfBodystructureOfMessage} from "../node/index.ts";
export class ResultOfIteratingOfBodystructureOfMessage<
	NodeToUse extends NodeOfBodystructureOfMessage<string, string>,
	SectionToUse extends null | SectionOfBodyOfMessage,
> {
	public constructor(node: NodeToUse, section: SectionToUse) {
		this.node = node;
		this.section = section;
	}
	public readonly node: NodeToUse;
	public readonly section: SectionToUse;
}
