import {BranchNonRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {z} from "zod";
export const schemaOfBranchNonRootNodeOfBodystructureOfMessage: z.ZodType<BranchNonRootNodeOfBodystructureOfMessage> =
	z.lazy(function createBranchNonRootNodeSchema() {
		return z
			.strictObject({
				childNodes: z.tuple(
					[schemaOfNonRootNodeOfBodystructureOfMessage],
					schemaOfNonRootNodeOfBodystructureOfMessage,
				),
				language: z.union([
					z.tuple([z.string().nonempty()]),
					z.undefined().transform<null>(function makeNull(
						language: undefined,
						context,
					): null {
						return null;
					}),
				]),
				parameters: z.strictObject({boundary: z.string().nonempty()}),
				part: z.string().nonempty(),
				type: z.union([
					z.literal(`multipart/alternative`),
					z.literal(`multipart/mixed`),
					z.literal(`multipart/related`),
				]),
			})
			.transform<BranchNonRootNodeOfBodystructureOfMessage>(
				function parseBranchNonRootNode(
					node,
				): BranchNonRootNodeOfBodystructureOfMessage {
					const parsedNode: BranchNonRootNodeOfBodystructureOfMessage =
						new BranchNonRootNodeOfBodystructureOfMessage(node.childNodes, {
							parameters: {boundary: node.parameters[`boundary`]},
							value: node.type,
						});
					return parsedNode;
				},
			);
	});
