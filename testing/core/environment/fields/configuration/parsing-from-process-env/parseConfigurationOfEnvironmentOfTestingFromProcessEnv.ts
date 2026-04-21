import type {schemaForProcessEnvOfTesting} from "../../../../schema-for-process-env/index.ts";
import type {ConfigurationOfEnvironmentOfTesting} from "../ConfigurationOfEnvironmentOfTesting.ts";
import {
	type DockerComposeOfConfigurationOfEnvironmentOfTesting,
	type DockerMailserverOfConfigurationOfEnvironmentOfTesting,
	parseDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
	parseDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
} from "../fields/index.ts";
import type {z} from "zod";
export function parseConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): ConfigurationOfEnvironmentOfTesting {
	const dockerCompose: DockerComposeOfConfigurationOfEnvironmentOfTesting =
		parseDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const dockerMailserver: DockerMailserverOfConfigurationOfEnvironmentOfTesting =
		parseDockerMailserverOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const configuration: ConfigurationOfEnvironmentOfTesting = {
		dockerCompose: dockerCompose,
		dockerMailserver: dockerMailserver,
		domain: `main.rfc-9051`,
	};
	return configuration;
}
