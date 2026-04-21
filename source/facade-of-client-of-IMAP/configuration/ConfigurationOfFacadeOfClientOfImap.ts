import type {PortOfConfigurationOfFacadeOfClientOfImap} from "./port/index.ts";
import type {UserOfConfigurationOfFacadeOfClientOfImap} from "./user/index.ts";
export type ConfigurationOfFacadeOfClientOfImap = {
	readonly hostname: string;
	readonly port: PortOfConfigurationOfFacadeOfClientOfImap;
	readonly user: UserOfConfigurationOfFacadeOfClientOfImap;
};
