import type {FlagsOfMessage} from "../../../message/index.ts";
import {z} from "zod";
export const schemaOfFlagsOfMessage: z.ZodType<FlagsOfMessage> = z.set(
	z.string().nonempty(),
);
