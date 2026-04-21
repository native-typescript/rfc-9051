import {z} from "zod";
export const schemaOfUid: z.ZodType<number> = z.int().positive();
