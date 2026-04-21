import {z} from "zod";
export const schemaOfHeaders: z.ZodType<Uint8Array<ArrayBuffer>> = z.instanceof(
	Uint8Array<ArrayBuffer>,
);
