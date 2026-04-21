import type {rfc5322} from "@native-typescript/rfc-5322";
export class User {
	public constructor(address: rfc5322.AddrSpec, password: string) {
		this.address = address;
		this.password = password;
	}
	public readonly address: rfc5322.AddrSpec;
	public readonly password: string;
}
