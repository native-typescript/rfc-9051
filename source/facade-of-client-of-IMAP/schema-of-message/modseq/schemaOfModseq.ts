import {z} from "zod";
export const schemaOfModseq: z.ZodType<bigint | null> = z.union([
	z.bigint().positive(),
	z
		.undefined()
		.optional()
		.transform<null>(function makeNull(modseq: undefined): null {
			return null;
		}),
]);
