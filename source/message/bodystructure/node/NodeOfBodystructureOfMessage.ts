import type {NonRootNodeOfBodystructureOfMessage} from "./implementations/index.ts";
export interface NodeOfBodystructureOfMessage<
	Placement extends string,
	Role extends string,
> {
	readonly contentDescription: null | string;
	iterateNodes(): IteratorObject<
		| NodeOfBodystructureOfMessage<Placement, Role>
		| NonRootNodeOfBodystructureOfMessage<string>,
		void,
		void
	>;
	readonly placement: Placement;
	readonly role: Role;
}
