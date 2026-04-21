import type {
	DockerComposeOfConfigurationOfEnvironmentOfTesting,
	DockerMailserverOfConfigurationOfEnvironmentOfTesting,
} from "./fields/index.ts";
export type ConfigurationOfEnvironmentOfTesting = {
	readonly dockerCompose: DockerComposeOfConfigurationOfEnvironmentOfTesting;
	readonly dockerMailserver: DockerMailserverOfConfigurationOfEnvironmentOfTesting;
	readonly domain: string;
};
