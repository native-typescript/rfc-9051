/**
 * https://datatracker.ietf.org/doc/html/rfc9051#name-formal-syntax
 */
export interface SearchKey<Type extends string> {
	readonly type: Type;
}
