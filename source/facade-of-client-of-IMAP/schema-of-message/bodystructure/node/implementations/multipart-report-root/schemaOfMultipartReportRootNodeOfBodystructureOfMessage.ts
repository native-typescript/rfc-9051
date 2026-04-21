import {MultipartReportRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {z} from "zod";
export const schemaOfMultipartReportRootNodeOfBodystructureOfMessage: z.ZodType<MultipartReportRootNodeOfBodystructureOfMessage> =
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
				"report-type": z.literal(`delivery-status`),
			}),
			type: z.literal(`multipart/report`),
		})
		.transform<MultipartReportRootNodeOfBodystructureOfMessage>(
			function parseMultipartReportRootNode(
				node,
			): MultipartReportRootNodeOfBodystructureOfMessage {
				const parsedNode: MultipartReportRootNodeOfBodystructureOfMessage =
					new MultipartReportRootNodeOfBodystructureOfMessage(node.childNodes, {
						parameters: {
							boundary: node.parameters[`boundary`],
							reportType: node.parameters[`report-type`],
						},
						value: node.type,
					});
				return parsedNode;
			},
		);
