import {LeafRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {z} from "zod";
export const schemaOfLeafRootNodeOfBodystructureOfMessage: z.ZodType<LeafRootNodeOfBodystructureOfMessage> =
	z
		.union([
			z.strictObject({
				description: z.union([
					z.string().nonempty(),
					z.undefined().transform<null>(function makeNull(
						description: undefined,
					): null {
						return null;
					}),
				]),
				disposition: z.undefined().transform<null>(function makeNull(
					disposition: undefined,
					context,
				): null {
					return null;
				}),
				dispositionParameters: z.undefined(),
				encoding: z.union([
					z.literal(`7bit`),
					z.literal(`8bit`),
					z.literal(`base64`),
					z.literal(`quoted-printable`),
				]),
				id: z.union([
					z.string().nonempty(),
					z.undefined().transform<null>(function makeNull(id: undefined): null {
						return null;
					}),
				]),
				parameters: z.strictObject({
					name: z.union([
						z.string().nonempty(),
						z.undefined().transform<null>(function makeNull(
							name: undefined,
						): null {
							return null;
						}),
					]),
				}),
				size: z.number().nonnegative(),
				type: z.union([
					z.templateLiteral([`application/`, z.string().nonempty()]),
					z.templateLiteral([`image/`, z.string().nonempty()]),
				]),
			}),
			z.strictObject({
				description: z.union([
					z.string().nonempty(),
					z.undefined().transform<null>(function makeNull(
						description: undefined,
					): null {
						return null;
					}),
				]),
				disposition: z.union([z.literal(`attachment`), z.literal(`inline`)]),
				dispositionParameters: z.union([
					z.record(z.string(), z.string().nonempty()),
					z.undefined().transform<null>(function makeNull(
						dispositionParameters: undefined,
						context,
					): null {
						return null;
					}),
				]),
				encoding: z.union([
					z.literal(`7bit`),
					z.literal(`8bit`),
					z.literal(`base64`),
					z.literal(`quoted-printable`),
				]),
				id: z.union([
					z.string().nonempty(),
					z.undefined().transform<null>(function makeNull(id: undefined): null {
						return null;
					}),
				]),
				parameters: z.strictObject({
					name: z.union([
						z.string().nonempty(),
						z.undefined().transform<null>(function makeNull(
							name: undefined,
						): null {
							return null;
						}),
					]),
				}),
				size: z.number().nonnegative(),
				type: z.union([
					z.templateLiteral([`application/`, z.string().nonempty()]),
					z.templateLiteral([`image/`, z.string().nonempty()]),
				]),
			}),
		])
		.transform<LeafRootNodeOfBodystructureOfMessage>(
			function parseLeafRootNode(node): LeafRootNodeOfBodystructureOfMessage {
				if (node.disposition === null) {
					const parsedNode: LeafRootNodeOfBodystructureOfMessage =
						new LeafRootNodeOfBodystructureOfMessage(
							node.description,
							node.disposition,
							node.encoding,
							{parameters: {name: node.parameters[`name`]}, value: node.type},
						);
					return parsedNode;
				} else {
					const {
						filename: filenameStandardizedParameterOfContentDisposition,
						...otherParametersOfContentDisposition
					} =
						node.dispositionParameters === null ?
							{}
						:	node.dispositionParameters;
					const parsedNode: LeafRootNodeOfBodystructureOfMessage =
						new LeafRootNodeOfBodystructureOfMessage(
							node.description,
							{
								otherParameters: otherParametersOfContentDisposition,
								standardizedParameters: {
									filename:
										(
											filenameStandardizedParameterOfContentDisposition
											=== undefined
										) ?
											null
										:	filenameStandardizedParameterOfContentDisposition,
								},
								value: node.disposition,
							},
							node.encoding,
							{parameters: {name: node.parameters[`name`]}, value: node.type},
						);
					return parsedNode;
				}
			},
		);
