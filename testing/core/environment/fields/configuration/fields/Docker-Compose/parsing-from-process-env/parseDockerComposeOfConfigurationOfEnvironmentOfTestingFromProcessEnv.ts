import type {schemaForProcessEnvOfTesting} from "../../../../../../schema-for-process-env/index.ts";
import type {DockerComposeOfConfigurationOfEnvironmentOfTesting} from "../DockerComposeOfConfigurationOfEnvironmentOfTesting.ts";
import {
	type BuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting,
	parseBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv,
} from "../fields/index.ts";
import type {z} from "zod";
export function parseDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
	processEnv: z.output<typeof schemaForProcessEnvOfTesting>,
): DockerComposeOfConfigurationOfEnvironmentOfTesting {
	const build: BuildOfDockerComposeOfConfigurationOfEnvironmentOfTesting =
		parseBuildOfDockerComposeOfConfigurationOfEnvironmentOfTestingFromProcessEnv(
			processEnv,
		);
	const dockerCompose: DockerComposeOfConfigurationOfEnvironmentOfTesting = {
		build: build,
	};
	return dockerCompose;
}
