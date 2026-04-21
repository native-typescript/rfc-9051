import {z} from "zod";
export const schemaOfStatusObjectToCountOfMessages: z.ZodType<number> = z
	.strictObject({
		messages: z.number().nonnegative(),
		path: z.string().nonempty(),
	})
	.transform<number>(
		function extractCountOfMessages(rawStatus, context): number {
			return rawStatus.messages;
		},
	);
