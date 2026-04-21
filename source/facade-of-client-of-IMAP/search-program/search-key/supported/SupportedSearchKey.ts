import type {SequenceSet} from "../../../sequence-set/index.ts";
import type {SupportedSearchKeys} from "../../search-keys/index.ts";
import type {
	AllSearchKey,
	AnsweredSearchKey,
	BccSearchKey,
	BeforeSearchKey,
	BodySearchKey,
	CcSearchKey,
	DeletedSearchKey,
	DraftSearchKey,
	FlaggedSearchKey,
	FromSearchKey,
	HeaderSearchKey,
	KeywordSearchKey,
	LargerSearchKey,
	NotSearchKey,
	OnSearchKey,
	OrSearchKey,
	ParenthesesSearchKey,
	SeenSearchKey,
	SentbeforeSearchKey,
	SentonSearchKey,
	SentsinceSearchKey,
	SequenceSetSearchKey,
	SinceSearchKey,
	SmallerSearchKey,
	SubjectSearchKey,
	TextSearchKey,
	ToSearchKey,
	UidSearchKey,
	UnansweredSearchKey,
	UndeletedSearchKey,
	UndraftSearchKey,
	UnflaggedSearchKey,
	UnkeywordSearchKey,
	UnseenSearchKey,
} from "../implementations/index.ts";
export type SupportedSearchKey =
	| AllSearchKey
	| AnsweredSearchKey
	| BccSearchKey<string>
	| BeforeSearchKey
	| BodySearchKey<string>
	| CcSearchKey<string>
	| DeletedSearchKey
	| DraftSearchKey
	| FlaggedSearchKey
	| FromSearchKey<string>
	| HeaderSearchKey<string, string>
	| KeywordSearchKey<string>
	| LargerSearchKey<number>
	| NotSearchKey<SupportedSearchKey>
	| OnSearchKey
	| OrSearchKey<SupportedSearchKey, SupportedSearchKey>
	| ParenthesesSearchKey<SupportedSearchKeys>
	| SeenSearchKey
	| SentbeforeSearchKey
	| SentonSearchKey
	| SentsinceSearchKey
	| SequenceSetSearchKey<SequenceSet>
	| SinceSearchKey
	| SmallerSearchKey<number>
	| SubjectSearchKey<string>
	| TextSearchKey<string>
	| ToSearchKey<string>
	| UidSearchKey<SequenceSet>
	| UnansweredSearchKey
	| UndeletedSearchKey
	| UndraftSearchKey
	| UnflaggedSearchKey
	| UnkeywordSearchKey<string>
	| UnseenSearchKey;
