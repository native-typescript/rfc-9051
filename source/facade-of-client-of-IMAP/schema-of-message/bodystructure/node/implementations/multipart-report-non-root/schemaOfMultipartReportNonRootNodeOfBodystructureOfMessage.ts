import {MultipartReportNonRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {z} from "zod";
export const schemaOfMultipartReportNonRootNodeOfBodystructureOfMessage: z.ZodType<MultipartReportNonRootNodeOfBodystructureOfMessage> =
	z.lazy(function createMultipartReportNonRootNodeSchema() {
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
				parameters: z.strictObject({
					boundary: z.string().nonempty(),
					"report-type": z.literal(`delivery-status`),
				}),
				part: z.string().nonempty(),
				type: z.literal(`multipart/report`),
			})
			.transform<MultipartReportNonRootNodeOfBodystructureOfMessage>(
				function parseMultipartReportNonRootNode(
					node,
				): MultipartReportNonRootNodeOfBodystructureOfMessage {
					const parsedNode: MultipartReportNonRootNodeOfBodystructureOfMessage =
						new MultipartReportNonRootNodeOfBodystructureOfMessage(
							node.childNodes,
							{
								parameters: {
									boundary: node.parameters[`boundary`],
									reportType: node.parameters[`report-type`],
								},
								value: node.type,
							},
						);
					return parsedNode;
				},
			);
	});
