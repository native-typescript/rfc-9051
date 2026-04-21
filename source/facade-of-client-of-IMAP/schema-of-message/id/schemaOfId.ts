import {z} from "zod";
export const schemaOfId: z.ZodType<string> = z.string().nonempty();
