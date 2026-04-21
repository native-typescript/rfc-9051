import type {BodystructureOfMessage} from "../../../message/index.ts";
import {schemaOfRootNodeOfBodystructureOfMessage} from "./node/index.ts";
import type {z} from "zod";
export const schemaOfBodystructureOfMessage: z.ZodType<BodystructureOfMessage> =
	schemaOfRootNodeOfBodystructureOfMessage;
