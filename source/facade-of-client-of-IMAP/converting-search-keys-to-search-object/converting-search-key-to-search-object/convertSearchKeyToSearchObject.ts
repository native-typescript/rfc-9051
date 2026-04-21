import type {SupportedSearchKey} from "../../search-program/index.ts";
import {applySearchKeyToSearchObject} from "./applying-search-key-to-search-object/index.ts";
import type {SearchObject} from "imapflow";
export function convertSearchKeyToSearchObject(
	searchKey: SupportedSearchKey,
): SearchObject {
	const searchObject: SearchObject = {};
	applySearchKeyToSearchObject(searchObject, searchKey);
	return searchObject;
}
