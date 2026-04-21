import {MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {z} from "zod";
export const schemaOfMessageDeliveryStatusNonRootNodeOfBodystructureOfMessage: z.ZodType<MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage> =
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
				lineCount: z.union([
					z.number().nonnegative(),
					z.undefined().transform<null>(function makeNull(
						lineCount: undefined,
					): null {
						return null;
					}),
				]),
				parameters: z.strictObject({
					charset: z.union([
						z.literal(`GB18030`),
						z
							.literal(`iso-8859-1`)
							.transform<`ISO-8859-1`>(function normalizeIso88591Charset(
								charset: `iso-8859-1`,
							): `ISO-8859-1` {
								return `ISO-8859-1`;
							}),
						z
							.literal(`iso-8859-2`)
							.transform<`ISO-8859-2`>(function normalizeIso88592Charset(
								charset: `iso-8859-2`,
							): `ISO-8859-2` {
								return `ISO-8859-2`;
							}),
						z.literal(`UTF-8`),
						z.literal(`us-ascii`).transform(function normalizeUsAsciiCharset(
							charset: `us-ascii`,
						): `US-ASCII` {
							return `US-ASCII`;
						}),
						z.literal(`utf-8`).transform(function normalizeUtf8Charset(
							charset: `utf-8`,
						): `UTF-8` {
							return `UTF-8`;
						}),
						z.undefined().transform<null>(function makeNull(
							charset: undefined,
						): null {
							return null;
						}),
					]),
					name: z.string().nonempty(),
				}),
				part: z.string().nonempty(),
				size: z.number().nonnegative(),
				type: z.literal(`message/delivery-status`),
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
				lineCount: z.union([
					z.number().nonnegative(),
					z.undefined().transform<null>(function makeNull(
						lineCount: undefined,
					): null {
						return null;
					}),
				]),
				parameters: z.strictObject({
					charset: z.union([
						z.literal(`GB18030`),
						z
							.literal(`iso-8859-1`)
							.transform<`ISO-8859-1`>(function normalizeIso88591Charset(
								charset: `iso-8859-1`,
							): `ISO-8859-1` {
								return `ISO-8859-1`;
							}),
						z
							.literal(`iso-8859-2`)
							.transform<`ISO-8859-2`>(function normalizeIso88592Charset(
								charset: `iso-8859-2`,
							): `ISO-8859-2` {
								return `ISO-8859-2`;
							}),
						z.literal(`UTF-8`),
						z.literal(`us-ascii`).transform(function normalizeUsAsciiCharset(
							charset: `us-ascii`,
						): `US-ASCII` {
							return `US-ASCII`;
						}),
						z.literal(`utf-8`).transform(function normalizeUtf8Charset(
							charset: `utf-8`,
						): `UTF-8` {
							return `UTF-8`;
						}),
						z.undefined().transform<null>(function makeNull(
							charset: undefined,
						): null {
							return null;
						}),
					]),
					name: z.string().nonempty(),
				}),
				part: z.string().nonempty(),
				size: z.number().nonnegative(),
				type: z.literal(`message/delivery-status`),
			}),
		])
		.transform<MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage>(
			function parseMessageDeliveryStatusNonRootNode(node) {
				if (node.disposition === null) {
					const parsedNode: MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage =
						new MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage(
							node.description,
							node.disposition,
							node.encoding,
							{
								parameters: {
									charset: node.parameters[`charset`],
									name: node.parameters[`name`],
								},
								value: node.type,
							},
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
					const parsedNode: MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage =
						new MessageDeliveryStatusNonRootNodeOfBodystructureOfMessage(
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
							{
								parameters: {
									charset: node.parameters[`charset`],
									name: node.parameters[`name`],
								},
								value: node.type,
							},
						);
					return parsedNode;
				}
			},
		);
