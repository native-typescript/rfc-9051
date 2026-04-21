import {z} from "zod";
export const schemaOfSeq: z.ZodType<number> = z.int().positive();
