import {Rfc822HeadersRootNodeOfBodystructureOfMessage} from "../../../../../../message/index.ts";
import {z} from "zod";
export const schemaOfRfc822HeadersRootNodeOfBodystructureOfMessage: z.ZodType<Rfc822HeadersRootNodeOfBodystructureOfMessage> =
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
							.transform<`ISO-8859-1`>(function transformIso88591(
								charset: `iso-8859-1`,
							): `ISO-8859-1` {
								return `ISO-8859-1`;
							}),
						z
							.literal(`iso-8859-2`)
							.transform<`ISO-8859-2`>(function transformIso88592(
								charset: `iso-8859-2`,
							): `ISO-8859-2` {
								return `ISO-8859-2`;
							}),
						z.literal(`UTF-8`),
						z.literal(`us-ascii`).transform(function transformUsAscii(
							charset: `us-ascii`,
						): `US-ASCII` {
							return `US-ASCII`;
						}),
						z.literal(`utf-8`).transform(function transformUtf8(
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
				type: z.literal(`text/rfc822-headers`),
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
							.transform<`ISO-8859-1`>(function transformIso88591(
								charset: `iso-8859-1`,
							): `ISO-8859-1` {
								return `ISO-8859-1`;
							}),
						z
							.literal(`iso-8859-2`)
							.transform<`ISO-8859-2`>(function transformIso88592(
								charset: `iso-8859-2`,
							): `ISO-8859-2` {
								return `ISO-8859-2`;
							}),
						z.literal(`UTF-8`),
						z.literal(`us-ascii`).transform(function transformUsAscii(
							charset: `us-ascii`,
						): `US-ASCII` {
							return `US-ASCII`;
						}),
						z.literal(`utf-8`).transform(function transformUtf8(
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
				type: z.literal(`text/rfc822-headers`),
			}),
		])
		.transform<Rfc822HeadersRootNodeOfBodystructureOfMessage>(
			function parseRfc822HeadersRootNode(
				node,
			): Rfc822HeadersRootNodeOfBodystructureOfMessage {
				if (node.disposition === null) {
					const parsedNode: Rfc822HeadersRootNodeOfBodystructureOfMessage =
						new Rfc822HeadersRootNodeOfBodystructureOfMessage(
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
					const parsedNode: Rfc822HeadersRootNodeOfBodystructureOfMessage =
						new Rfc822HeadersRootNodeOfBodystructureOfMessage(
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
