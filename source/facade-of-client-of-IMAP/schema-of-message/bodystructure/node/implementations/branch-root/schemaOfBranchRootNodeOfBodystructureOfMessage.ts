import {BranchRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {z} from "zod";
export const schemaOfBranchRootNodeOfBodystructureOfMessage: z.ZodType<BranchRootNodeOfBodystructureOfMessage> =
	z
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
			parameters: z.strictObject({
				boundary: z.string().nonempty(),
				charset: z.union([
					z.string().nonempty(),
					z.undefined().transform<null>(function makeNull(
						charset: undefined,
						context,
					): null {
						return null;
					}),
				]),
				type: z.union([
					z.literal(`multipart/alternative`),
					z.undefined().transform<null>(function makeNull(
						type: undefined,
						context,
					): null {
						return null;
					}),
				]),
			}),
			type: z.union([
				z.literal(`multipart/alternative`),
				z.literal(`multipart/mixed`),
				z.literal(`multipart/related`),
			]),
		})
		.transform<BranchRootNodeOfBodystructureOfMessage>(
			function parseBranchRootNode(
				node,
			): BranchRootNodeOfBodystructureOfMessage {
				const parsedNode: BranchRootNodeOfBodystructureOfMessage =
					new BranchRootNodeOfBodystructureOfMessage(node.childNodes, {
						parameters: {
							boundary: node.parameters[`boundary`],
							type: node.parameters[`type`],
						},
						value: node.type,
					});
				return parsedNode;
			},
		);
