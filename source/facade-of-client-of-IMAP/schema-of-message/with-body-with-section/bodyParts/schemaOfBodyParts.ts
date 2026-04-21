import {z} from "zod";
export const schemaOfBodyParts: z.ZodType<Uint8Array<ArrayBuffer>> = z
	.map(z.string(), z.instanceof(Uint8Array<ArrayBuffer>))
	.transform<readonly (readonly [string, Uint8Array<ArrayBuffer>])[]>(
		function extractEntries(
			bodyParts,
		): readonly (readonly [string, Uint8Array<ArrayBuffer>])[] {
			const entries: readonly (readonly [string, Uint8Array<ArrayBuffer>])[] =
				Array.from(bodyParts.entries());
			return entries;
		},
	)
	.pipe(
		z
			.tuple([
				z
					.tuple([z.string(), z.instanceof(Uint8Array<ArrayBuffer>)])
					.transform<
						Uint8Array<ArrayBuffer>
					>(function extractBody(entry): Uint8Array<ArrayBuffer> {
						const [, body] = entry;
						return body;
					}),
			])
			.transform<Uint8Array<ArrayBuffer>>(function extractBody(
				bodies: readonly [Uint8Array<ArrayBuffer>],
			): Uint8Array<ArrayBuffer> {
				const [body] = bodies;
				return body;
			}),
	);
