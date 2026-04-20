export interface NodeOfBodystructureOfMessage<
	Placement extends string,
	Role extends string,
> {
	readonly contentDescription: null | string;
	readonly placement: Placement;
	readonly role: Role;
}
