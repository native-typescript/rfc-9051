import {
	type SupportedSearchKey,
	typeOfAllSearchKey,
	typeOfAnsweredSearchKey,
	typeOfBccSearchKey,
	typeOfBeforeSearchKey,
	typeOfBodySearchKey,
	typeOfCcSearchKey,
	typeOfDeletedSearchKey,
	typeOfDraftSearchKey,
	typeOfFlaggedSearchKey,
	typeOfFromSearchKey,
	typeOfHeaderSearchKey,
	typeOfKeywordSearchKey,
	typeOfLargerSearchKey,
	typeOfNotSearchKey,
	typeOfOnSearchKey,
	typeOfOrSearchKey,
	typeOfSeenSearchKey,
	typeOfSentbeforeSearchKey,
	typeOfSentonSearchKey,
	typeOfSentsinceSearchKey,
	typeOfSequenceSetSearchKey,
	typeOfSinceSearchKey,
	typeOfSmallerSearchKey,
	typeOfSubjectSearchKey,
	typeOfToSearchKey,
	typeOfUidSearchKey,
	typeOfUnansweredSearchKey,
	typeOfUndeletedSearchKey,
	typeOfUndraftSearchKey,
	typeOfUnflaggedSearchKey,
	typeOfUnkeywordSearchKey,
	typeOfUnseenSearchKey,
} from "../../../search-program/index.ts";
import {convertSearchKeyToSearchObject} from "../convertSearchKeyToSearchObject.ts";
import type {SearchObject} from "imapflow";
export function applySearchKeyToSearchObject(
	searchObject: SearchObject,
	searchKey: SupportedSearchKey,
): void {
	switch (searchKey.type) {
		case typeOfAllSearchKey: {
			searchObject.all = true;
			return;
		}
		case typeOfAnsweredSearchKey: {
			searchObject.answered = true;
			return;
		}
		case typeOfBccSearchKey: {
			searchObject.bcc = searchKey.astring;
			return;
		}
		case typeOfBeforeSearchKey: {
			searchObject.before = searchKey.date;
			return;
		}
		case typeOfBodySearchKey: {
			searchObject.body = searchKey.astring;
			return;
		}
		case typeOfCcSearchKey: {
			searchObject.cc = searchKey.astring;
			return;
		}
		case typeOfDeletedSearchKey: {
			searchObject.deleted = true;
			return;
		}
		case typeOfDraftSearchKey: {
			searchObject.draft = true;
			return;
		}
		case typeOfFlaggedSearchKey: {
			searchObject.flagged = true;
			return;
		}
		case typeOfFromSearchKey: {
			searchObject.from = searchKey.astring;
			return;
		}
		case typeOfHeaderSearchKey: {
			searchObject.header = {[searchKey.headerFldName]: searchKey.astring};
			return;
		}
		case typeOfKeywordSearchKey: {
			searchObject.keyword = searchKey.flagKeyword;
			return;
		}
		case typeOfLargerSearchKey: {
			searchObject.larger = searchKey.number;
			return;
		}
		case typeOfNotSearchKey: {
			searchObject.not = convertSearchKeyToSearchObject(searchKey.searchKey);
			return;
		}
		case typeOfOnSearchKey: {
			searchObject.on = searchKey.date;
			return;
		}
		case typeOfOrSearchKey: {
			const searchObjectForSubKey1: SearchObject =
				convertSearchKeyToSearchObject(searchKey.subSearchKey1);
			const searchObjectForSubKey2: SearchObject =
				convertSearchKeyToSearchObject(searchKey.subSearchKey2);
			searchObject.or = [searchObjectForSubKey1, searchObjectForSubKey2];
			return;
		}
		case typeOfSeenSearchKey: {
			searchObject.seen = true;
			return;
		}
		case typeOfSentbeforeSearchKey: {
			searchObject.sentBefore = searchKey.date;
			return;
		}
		case typeOfSentonSearchKey: {
			searchObject.sentOn = searchKey.date;
			return;
		}
		case typeOfSentsinceSearchKey: {
			searchObject.sentSince = searchKey.date;
			return;
		}
		case typeOfSequenceSetSearchKey: {
			searchObject.seq = searchKey.sequenceSet.serialize();
			return;
		}
		case typeOfSinceSearchKey: {
			searchObject.since = searchKey.date;
			return;
		}
		case typeOfSmallerSearchKey: {
			searchObject.smaller = searchKey.number;
			return;
		}
		case typeOfSubjectSearchKey: {
			searchObject.subject = searchKey.astring;
			return;
		}
		case typeOfToSearchKey: {
			searchObject.to = searchKey.astring;
			return;
		}
		case typeOfUidSearchKey: {
			searchObject.uid = searchKey.sequenceSet.serialize();
			return;
		}
		case typeOfUnansweredSearchKey: {
			searchObject.answered = false;
			return;
		}
		case typeOfUndeletedSearchKey: {
			searchObject.deleted = false;
			return;
		}
		case typeOfUndraftSearchKey: {
			searchObject.draft = false;
			return;
		}
		case typeOfUnflaggedSearchKey: {
			searchObject.flagged = false;
			return;
		}
		case typeOfUnkeywordSearchKey: {
			searchObject.unKeyword = searchKey.flagKeyword;
			return;
		}
		case typeOfUnseenSearchKey: {
			searchObject.seen = false;
			return;
		}
	}
}
