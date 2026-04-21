import type {SupportedSearchKeys} from "../search-program/index.ts";
import {applySearchKeyToSearchObject} from "./converting-search-key-to-search-object/index.ts";
import type {SearchObject} from "imapflow";
export function convertSearchKeysToSearchObject(
	searchKeys: SupportedSearchKeys,
): SearchObject {
	const searchObject: SearchObject = {};
	for (const searchKey of searchKeys) {
		applySearchKeyToSearchObject(searchObject, searchKey);
		continue;
	}
	return searchObject;
}
