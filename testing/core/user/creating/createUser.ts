import {User} from "../User.ts";
import {rfc5322} from "@native-typescript/rfc-5322";
export function createUser(domain: string, localPart: string): User {
	const addressOfUser: rfc5322.AddrSpec = new rfc5322.AddrSpec(
		localPart,
		domain,
	);
	const passwordOfUser: string = localPart;
	const user: User = new User(addressOfUser, passwordOfUser);
	return user;
}
