import type {ConfigurationOfFacadeOfClientOfImap} from "../configuration/index.ts";
import {StoreOfUidOfFacadeOfClientOfImap} from "./store/index.ts";
/**
 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing the [UID command](https://datatracker.ietf.org/doc/html/rfc9051#name-uid-command). You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
 */
export class UidOfFacadeOfClientOfImap {
	public constructor(configuration: ConfigurationOfFacadeOfClientOfImap) {
		this.store = new StoreOfUidOfFacadeOfClientOfImap(configuration);
	}
	/**
	 * A [facade](https://en.wikipedia.org/wiki/Facade_pattern) for performing the [UID command](https://datatracker.ietf.org/doc/html/rfc9051#name-uid-command) with the [STORE command](https://datatracker.ietf.org/doc/html/rfc9051#name-store-command). You can safely call this facade's methods concurrently. Each method call will instantiate a new client to do the work.
	 */
	public readonly store: StoreOfUidOfFacadeOfClientOfImap;
}
