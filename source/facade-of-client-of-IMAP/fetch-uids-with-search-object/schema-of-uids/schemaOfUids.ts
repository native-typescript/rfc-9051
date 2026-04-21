import {z} from "zod";
export const schemaOfUids = z.array(z.number());
