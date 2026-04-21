import {schemaOfUids} from "./schema-of-uids/index.ts";
import type {ImapFlow, SearchObject} from "imapflow";
export async function fetchUidsWithSearchObject(
	client: ImapFlow,
	searchObject: SearchObject,
): Promise<readonly number[]> {
	const uids: unknown = await client.search(searchObject, {uid: true});
	const validatedUids: readonly number[] = schemaOfUids.parse(uids);
	return validatedUids;
}
