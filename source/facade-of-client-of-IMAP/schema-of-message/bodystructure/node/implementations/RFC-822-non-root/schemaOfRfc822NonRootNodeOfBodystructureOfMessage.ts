import {Rfc822NonRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {schemaOfEnvelopeOfMessage} from "../../../../envelope/index.ts";
import {schemaOfNonRootNodeOfBodystructureOfMessage} from "../non-root/index.ts";
import {z} from "zod";
export const schemaOfRfc822NonRootNodeOfBodystructureOfMessage: z.ZodType<Rfc822NonRootNodeOfBodystructureOfMessage> =
	z.lazy(function createRfc822NonRootNodeSchema() {
		return z
			.union([
				z.strictObject({
					childNodes: z.tuple(
						[schemaOfNonRootNodeOfBodystructureOfMessage],
						schemaOfNonRootNodeOfBodystructureOfMessage,
					),
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
					envelope: schemaOfEnvelopeOfMessage,
					id: z.union([
						z.string().nonempty(),
						z.undefined().transform<null>(function makeNull(
							id: undefined,
						): null {
							return null;
						}),
					]),
					lineCount: z.number().nonnegative(),
					parameters: z.strictObject({name: z.string().nonempty()}),
					part: z.string().nonempty(),
					size: z.number().nonnegative(),
					type: z.literal(`message/rfc822`),
				}),
				z.strictObject({
					childNodes: z.tuple(
						[schemaOfNonRootNodeOfBodystructureOfMessage],
						schemaOfNonRootNodeOfBodystructureOfMessage,
					),
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
					envelope: schemaOfEnvelopeOfMessage,
					id: z.union([
						z.string().nonempty(),
						z.undefined().transform<null>(function makeNull(
							id: undefined,
						): null {
							return null;
						}),
					]),
					lineCount: z.number().nonnegative(),
					parameters: z.strictObject({name: z.string().nonempty()}),
					part: z.string().nonempty(),
					size: z.number().nonnegative(),
					type: z.literal(`message/rfc822`),
				}),
			])
			.transform<Rfc822NonRootNodeOfBodystructureOfMessage>(
				function parseRfc822NonRootNode(
					node,
				): Rfc822NonRootNodeOfBodystructureOfMessage {
					if (node.disposition === null) {
						const parsedNode: Rfc822NonRootNodeOfBodystructureOfMessage =
							new Rfc822NonRootNodeOfBodystructureOfMessage(
								node.childNodes,
								node.description,
								node.envelope,
								node.encoding,
								node.size,
								node.lineCount,
								null,
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
						const parsedNode: Rfc822NonRootNodeOfBodystructureOfMessage =
							new Rfc822NonRootNodeOfBodystructureOfMessage(
								node.childNodes,
								node.description,
								node.envelope,
								node.encoding,
								node.size,
								node.lineCount,
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
							);
						return parsedNode;
					}
				},
			);
	});
