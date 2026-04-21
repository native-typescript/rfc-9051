import {rfc5322} from "@native-typescript/rfc-5322";
import {z} from "zod";
export const schemaOfSource: z.ZodType<rfc5322.Message> = z
	.instanceof(Uint8Array<ArrayBuffer>)
	.transform<rfc5322.Message>(function parseSource(source): rfc5322.Message {
		const parsedSource: rfc5322.Message =
			rfc5322.createMessageFromStringUnsafely(
				Buffer.from(source).toString(`utf-8`),
			);
		return parsedSource;
	});
